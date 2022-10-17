import { ScheduleModule } from '@nestjs/schedule';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SchedulerManager } from './schedules.scheduler';
import { DatabaseModule } from 'src/database/database.module';
import { RequestHeaders } from './schedules.middleware';

@Module({
  imports: [ScheduleModule.forRoot(), DatabaseModule],
  controllers: [SchedulesController],
  providers: [SchedulesService, SchedulerManager],
})
export class SchedulesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestHeaders).forRoutes(SchedulesController);
  }
}
