import { Module } from '@nestjs/common';
import { PrismaService } from './database/database.service';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  providers: [PrismaService],
  imports: [SchedulesModule],
})
export class AppModule {}
