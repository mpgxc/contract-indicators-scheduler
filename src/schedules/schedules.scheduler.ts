import { Cron, CronExpression } from '@nestjs/schedule';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class SchedulerManager {
  private readonly logger = new Logger(SchedulerManager.name);

  constructor(private readonly prisma: PrismaClient) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCron() {
    const schedules = await this.prisma.scheduledContractIndicators.findMany({
      include: {
        Customer: true,
        Contract: true,
        ContractIndicator: true,
      },
    });

    this.logger.debug(`Schedules: ${JSON.stringify(schedules)}`);
  }
}
