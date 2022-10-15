import {
  Logger,
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { CreateScheduleDto, FrequencyPatternUnion } from './schedules.input';
import { ScheduledContractIndicators } from '@prisma/client';
import dayjs from 'dayjs';

@Injectable()
export class SchedulesService {
  private readonly logger = new Logger(SchedulesService.name);

  constructor(private readonly prisma: PrismaService) {}

  private nextDate(date: Date, days = 0) {
    const today = dayjs(date);

    return today.add(days, 'days').format('YYYY-MM-DD');
  }

  private parseFrequency = (frequency: FrequencyPatternUnion) =>
    ((
      {
        DAILY_1: 1,
        WEEKLY_7: 7,
        BIWEEKLY_15: 15,
        MONTHLY_30: 30,
        BIMONTHLY_60: 60,
        QUARTERLY_90: 90,
        SEMESTERLY_180: 180,
        YEARLY_365: 365,
      } as Record<FrequencyPatternUnion, number>
    )[frequency]);

  async create({
    frequency,
    contractId,
    customerId,
    contractIndicatorId,
  }: CreateScheduleDto): Promise<ScheduledContractIndicators> {
    this.logger.log(`Creating schedule for contract ${contractId}`);

    this.logger.log({
      frequency,
      contractId,
      customerId,
      contractIndicatorId,
    });

    const alredyScheduled =
      await this.prisma.scheduledContractIndicators.findUnique({
        where: { contractIndicatorId },
      });

    if (alredyScheduled) {
      throw new ConflictException(
        `Contract indicator ${contractIndicatorId} is already scheduled`,
      );
    }

    const customer = await this.prisma.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with id ${customerId} not found`);
    }

    const contract = await this.prisma.contract.findUnique({
      where: {
        id: contractId,
      },
    });

    if (!contract) {
      throw new NotFoundException(`Contract with id ${contractId} not found`);
    }

    const contractIndicator = await this.prisma.contractIndicator.findUnique({
      where: {
        id: contractIndicatorId,
      },
    });

    if (!contractIndicator) {
      throw new NotFoundException(
        `contractIndicator with id ${contractIndicatorId} not found`,
      );
    }

    const frequencyInDays = this.parseFrequency(frequency);
    const nextExecutionDate = this.nextDate(new Date(), frequencyInDays);

    return this.prisma.scheduledContractIndicators.create({
      data: {
        frequency,
        contractId,
        customerId,
        nextExecutionDate: new Date(nextExecutionDate),
        contractIndicatorId,
      },
    });
  }
}
