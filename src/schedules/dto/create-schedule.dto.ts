import { IsIn, IsNotEmpty, IsString } from 'class-validator';

enum FrequencyPatternEnum {
  'DAILY_1',
  'WEEKLY_7',
  'MONTHLY_30',
  'QUARTERLY_90',
  'ANNUAL_365',
}

export type FrequencyPatternUnion = keyof typeof FrequencyPatternEnum;

export const FrequencyPatternKeys = Object.keys(FrequencyPatternEnum).filter(
  (key) => isNaN(Number(key)),
);

export class CreateScheduleDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(FrequencyPatternKeys)
  frequency: FrequencyPatternUnion;

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
