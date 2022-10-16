import { SchedulerRegistry } from '@nestjs/schedule';
import { Injectable, Logger } from '@nestjs/common';
import { CronJob } from 'cron';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class SchedulerManager {
  private readonly logger = new Logger(SchedulerManager.name);
  private prisma!: PrismaClient;

  constructor(private schedulerRegistry: SchedulerRegistry) {}

  public setPrisma(prisma: PrismaClient) {
    this.prisma = prisma;

    return this;
  }

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
