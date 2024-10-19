import { Cron, CronOptions } from '@nestjs/schedule';

export function IsCronJob(cronTime: string | Date, options?: CronOptions): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return process.env.IS_CRON_JOB === 'true' ? Cron(cronTime, options) : () => {};
}
