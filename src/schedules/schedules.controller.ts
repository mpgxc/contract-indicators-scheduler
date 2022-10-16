import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './schedules.input';
import { SchedulerManager } from './schedules.scheduler';
import { Request as RequestExpress } from 'express';

@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly schedulerManager: SchedulerManager,
  ) {}

  @Post()
  create(
    @Body() createScheduleDto: CreateScheduleDto,
    @Request() req: RequestExpress,
  ) {
    return this.schedulesService
      .setPrisma(req.prisma)
      .create(createScheduleDto);
  }

  @Get()
  findAll(@Request() req: RequestExpress) {
    return this.schedulesService.setPrisma(req.prisma).findAll();
  }

  @Post('add')
  addCronJob(
    @Body() body: { name: string; seconds: string },
    @Request() req: RequestExpress,
  ) {
    this.schedulerManager
      .setPrisma(req.prisma)
      .addCronJob(body.name, body.seconds);
  }
}
