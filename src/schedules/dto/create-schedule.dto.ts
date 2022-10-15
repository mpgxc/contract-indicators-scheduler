import { IsIn, IsNotEmpty, IsString } from 'class-validator';

enum FrequencyPatternEnum {
  'DAILY_1',
  'WEEKLY_7',
  'MONTHLY_30',
  'QUARTERLY_90',
  'ANNUAL_365',
}

export type FrequencyPattern = keyof typeof FrequencyPatternEnum;

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(FrequencyPatternEnum))
  frequency: FrequencyPattern;

  @IsString()
  @IsNotEmpty()
  contractId: string;

  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsString()
  @IsNotEmpty()
  contractIndicatorId: string;
}
