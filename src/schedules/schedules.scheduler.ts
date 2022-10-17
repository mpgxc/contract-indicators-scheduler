import { SchedulerRegistry } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { CronJob } from 'cron';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SchedulerManager {
  private readonly logger = new Logger(SchedulerManager.name);

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly prisma: PrismaClient,
  ) {}

  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`*/${seconds} * * * * *`, async () => {
      this.logger.debug(`Tempo (${seconds}): JOB ${name}`);

      try {
        const schedules =
          await this.prisma.scheduledContractIndicators.findMany({
            include: {
              Customer: true,
              Contract: true,
              ContractIndicator: true,
            },
          });

        console.info(schedules);
      } catch (error) {
        this.logger.error(error);

        this.schedulerRegistry.deleteCronJob(name);
      }
    });

    this.schedulerRegistry.addCronJob(name, job);

    job.start();
  }
}
