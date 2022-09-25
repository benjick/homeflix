import fetch from 'node-fetch';
import { load } from 'ts-dotenv';

const env = load({
  CLOUDFLARE_ZONE_ID: String,
  CLOUDFLARE_API_TOKEN: String,
  CLOUDFLARE_DOMAIN: String,
});

const zoneId = env.CLOUDFLARE_ZONE_ID;
const domain = env.CLOUDFLARE_DOMAIN;
const apiToken = env.CLOUDFLARE_API_TOKEN;

interface Record {
  id: string;
  zone_id: string;
  zone_name: string;
  name: string;
  type: string;
  content: string;
  proxiable: boolean;
  proxied: boolean;
  ttl: number;
  created_on: string;
  modified_on: string;
}

const options = {
  headers: {
    Authorization: `Bearer ${apiToken}`,
    'Content-Type': 'application/json',
  },
};

async function getMyIp(): Promise<string> {
  const res = await fetch('https://api.ipify.org?format=json');
  const json: any = await res.json();
  return json.ip;
}

export async function updateDnsIp() {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`,
    options,
  );
  const json = (await res.json()) as {
    result: Record[];
  };
  const record = json.result.find((i) => i.name === domain) as Record;
  const currentIp = await getMyIp();
  if (record.content !== currentIp) {
    console.log('💻 IP address needs updating...');
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${record.id}`,
      {
        ...options,
        method: 'PUT',
        body: JSON.stringify({
          content: currentIp,
          type: 'A',
          name: domain,
        }),
      },
    );

    if (res.status === 200) {
      console.log('✅ Updated IP address!');
    } else {
      const json = await res.json();
      console.log('⚠️ DNS update error', json);
    }
  } else {
    console.log('🙏 Update not needed');
  }
}
