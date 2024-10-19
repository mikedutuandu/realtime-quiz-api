import { urlToHttpOptions } from 'url';
import { registerAs } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

export const CONFIG_REDIS = 'redis';
const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisOptions = urlToHttpOptions(new URL(redisUrl));
export default registerAs(CONFIG_REDIS, () => ({
  transport: Transport.REDIS,
  options: {
    url: redisUrl,
    host: redisOptions.hostname,
    port: redisOptions.port,
    // username: redisOptions.auth.split(':')[0],
    // password: redisOptions.auth.split(':')[1],
    // tls: true,
  },
}));
