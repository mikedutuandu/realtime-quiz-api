import { DataSource } from 'typeorm';

import { configFactory } from './database';

export default new DataSource(configFactory());
