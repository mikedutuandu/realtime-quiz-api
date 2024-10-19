import { registerAs } from '@nestjs/config';

export const CONFIG_SWAGGER = 'swagger';

export default registerAs(CONFIG_SWAGGER, () => ({
  enable: process.env.SWAGGER_ENABLE === 'true',
}));
