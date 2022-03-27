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
console.log('filename', filename);
type Data = {
  containers: Container[];
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

async function getContainers() {
  const file = fs.readFileSync(filename, 'utf-8');
  const json = yaml.parse(file);
  const containers = Object.keys(json.services).sort();

  return Promise.all(
    containers.map(async (service) => {
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
}

async function restartContainers(containers: string[]) {
  await Promise.all(
    containers.map(async (service) => {
      try {
        const container = docker.getContainer(service);
        await container.restart();
      } catch (error) {
        // eat error
      }
    }),
  );
}

async function startContainers(containers: string[]) {
  await Promise.all(
    containers.map(async (service) => {
      try {
        const container = docker.getContainer(service);
        await container.start();
      } catch (error) {
        // eat error
      }
    }),
  );
}

async function stopContainers(containers: string[]) {
  await Promise.all(
    containers.map(async (service) => {
      try {
        const container = docker.getContainer(service);
        await container.stop();
      } catch (error) {
        // eat error
      }
    }),
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const containers = await getContainers();
  if (req.method === 'POST') {
    if (req.body.action === 'restart' && req.body.containers) {
      await restartContainers(req.body.containers);
    }
    if (req.body.action === 'stop' && req.body.containers) {
      await stopContainers(req.body.containers);
    }
    if (req.body.action === 'start' && req.body.containers) {
      await startContainers(req.body.containers);
    }
  }
  res.status(200).json({ containers });
}
