import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/database.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@Injectable()
export class SchedulesService {
  private readonly logger = new Logger(SchedulesService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   *  Isso jamais deveria ser feito em um projeto real, mass.....
   */
  private nextDate(date: Date, days: number) {
    const increasedDays = new Date(date);

    increasedDays.setDate(increasedDays.getDate() + days);

    return increasedDays;
  }

  private parseFrequency = (frequency: string) =>
    ({
      DAILY_1: 1,
      WEEKLY_7: 7,
      MONTHLY_30: 30,
      QUARTERLY_90: 90,
      ANNUAL_365: 365,
    }[frequency]);

  async create({
    frequency,
    contractId,
    customerId,
    contractIndicatorId,
  }: CreateScheduleDto) {
    this.logger.log(`Creating schedule for contract ${contractId}`);

    this.logger.log({
      frequency,
      contractId,
      customerId,
      contractIndicatorId,
    });

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
        nextExecutionDate,
        contractIndicatorId,
      },
    });
  }

  findAll() {
    return `This action returns all schedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} schedule`;
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} schedule`;
  }
}
