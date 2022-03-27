import type { NextApiRequest, NextApiResponse } from 'next';
import * as yaml from 'yaml';
import * as path from 'path';
import * as fs from 'fs';
import Docker from 'dockerode';
import { Container, ContainerStatus } from '../../src/models/Docker';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

async function getServerIp() {
  const res = await fetch('https://ifconfig.me/ip');
  const ip = await res.text();
  return ip;
}

async function getWireguardIp() {
  const container = docker.getContainer('test-wireguard');
  try {
    await container.start();
    const output = await container.logs({
      stdout: true,
      timestamps: true,
    });
    return output
      .toString()
      .trim()
      .split('\n')
      .map((s) => s.split('Z ')[1])
      .reverse()[0];
  } catch (error) {
    return 'error';
  }
}

interface Data {
  server: string;
  wireguard: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const [server, wireguard] = await Promise.all([
    getServerIp(),
    getWireguardIp(),
  ]);
  res.status(200).json({ server, wireguard });
}
