import type { NextApiRequest, NextApiResponse } from 'next';
import { fakeHistory } from '../../src/fake/history';

interface Data {
  server: string;
  wireguard: string;
  logs?: string;
}

async function getHistory() {
  if (process.env.NODE_ENV === 'development') {
    return fakeHistory;
  }
  const apikey = process.env.SABNZBD_API_KEY;
  const response = await fetch(
    `http://sabnzbd:8080/sabnzbd/api?mode=history&search=&failed_only=0&start=0&limit=10&last_history_update=667&output=json&apikey=${apikey}&_=${new Date().getTime()}`,
  );
  const json = await response.json();
  return json;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const [{ history }] = await Promise.all([getHistory()]);
  res.status(200).json({ history });
}
