import type { NextApiRequest, NextApiResponse } from 'next';
import Docker from 'dockerode';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

function cleanLogs(logs: NodeJS.ReadableStream) {
  return logs
    .toString()
    .trim()
    .split('\n')
    .map((s) => s.split('Z ')[1])
    .join('\n');
}

async function getWireguardLogs() {
  const container = docker.getContainer('wireguard');
  try {
    const output = await container.logs({
      stdout: true,
      stderr: true,
      timestamps: true,
    });
    return cleanLogs(output);
  } catch (error) {
    return;
  }
}

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
    return cleanLogs(output).split('\n').reverse()[0];
  } catch (error) {
    return 'error';
  }
}

interface Data {
  server: string;
  wireguard: string;
  logs?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const [server, wireguard, logs] = await Promise.all([
    getServerIp(),
    getWireguardIp(),
    getWireguardLogs(),
  ]);
  res.status(200).json({ server, wireguard, logs });
}
