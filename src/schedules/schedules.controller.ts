import { Controller, Post, Body, Get } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './schedules.input';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post()
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Get()
  findAll() {
    return this.schedulesService.findAll();
  }
}
