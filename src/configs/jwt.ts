import { registerAs } from '@nestjs/config';

export const CONFIG_JWT = 'jwt';

export default registerAs(CONFIG_JWT, () => ({
  privateKey: Buffer.from(process.env.APP_JWT_PRIVATE_KEY_BASE64 || '', 'base64').toString('utf8'),
  publicKey: Buffer.from(process.env.APP_JWT_PUBLIC_KEY_BASE64 || '', 'base64').toString('utf8'),
  signOptions: {
    expiresIn: Number(process.env.APP_JWT_EXPIRES),
    algorithm: 'RS256',
  },
}));
