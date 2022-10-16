import { ScheduleModule } from '@nestjs/schedule';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SchedulerManager } from './schedules.scheduler';
import { TenantMiddleware } from '../tenant.middleware';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [SchedulesController],
  providers: [SchedulesService, SchedulerManager],
})
export class SchedulesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes(SchedulesController);
  }
}
