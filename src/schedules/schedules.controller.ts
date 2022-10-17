import { Controller, Post, Body, Get } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './schedules.input';
import { SchedulerManager } from './schedules.scheduler';

@Controller('schedules')
export class SchedulesController {
  constructor(
    private readonly schedulesService: SchedulesService,
    private readonly schedulerManager: SchedulerManager,
  ) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  findAll() {
    return this.schedulesService.findAll();
  }

  @Post('add')
  addCronJob(@Body() body: { name: string; seconds: string }) {
    this.schedulerManager.addCronJob(body.name, body.seconds);
  }
}
