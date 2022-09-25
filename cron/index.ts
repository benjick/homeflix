import { CronJob } from 'cron';
import { updateDnsIp } from './ip';

const dnsJob = new CronJob('0 * * * *', updateDnsIp);
dnsJob.start();

console.log('⏰ Started cron jobs...');
