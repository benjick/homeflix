import type { NextApiRequest, NextApiResponse } from 'next';
import * as yaml from 'yaml';
import * as path from 'path';
import * as fs from 'fs';
import Docker from 'dockerode';
import { Container, ContainerStatus } from '../../src/models/Docker';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

const filename =
  process.env.NODE_ENV === 'production'
    ? '/docker-compose.yml'
    : path.resolve(__dirname, '../../../../../docker-compose.yml');

type Data = {
  services: Container[];
};

function determineContainerStatus(
  state: Docker.ContainerInspectInfo['State'],
): ContainerStatus {
  if (state.Restarting) {
    return 'restarting';
  }
  if (state.Running) {
    return 'running';
  }
  if (state.Paused) {
    return 'paused';
  }
  if (state.Status === 'exited') {
    return 'exited';
  }
  return 'unknown';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const file = fs.readFileSync(filename, 'utf-8');
  const json = yaml.parse(file);
  const services = Object.keys(json.services).sort();
  const resolved = await Promise.all(
    services.map(async (service) => {
      const isBuild = !!json.services[service].build;
      const container = docker.getContainer(service);
      let status: ContainerStatus = 'unknown';
      try {
        const inspectionInfo = await container.inspect();
        status = determineContainerStatus(inspectionInfo.State);
      } catch (error) {
        status = 'missing';
      }
      return {
        id: service,
        status,
        isBuild,
      };
    }),
  );
  res.status(200).json({ services: resolved });
}
