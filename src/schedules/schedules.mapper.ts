import { FrequencyPatternUnion } from './schedules.input';

type FrequencyPatternParse = {
  label:
    | 'Diária'
    | 'Semanal'
    | 'Quinzenal'
    | 'Mensal'
    | 'Bimestral'
    | 'Trimestral'
    | 'Semestral'
    | 'Anual';
  value: FrequencyPatternUnion;
  description: string;
};

export const frequencyPatternParse: FrequencyPatternParse[] = [
  {
    value: 'DAILY_1',
    label: 'Diária',
    description: 'Útimas 24 horas',
  },
  {
    value: 'WEEKLY_7',
    label: 'Semanal',
    description: 'Útimos 7 dias',
  },
  {
    value: 'BIWEEKLY_15',
    label: 'Quinzenal',
    description: 'Útimos 15 dias',
  },
  {
    value: 'MONTHLY_30',
    label: 'Mensal',
    description: 'Útimos 30 dias',
  },
  {
    value: 'BIMONTHLY_60',
    label: 'Bimestral',
    description: 'Útimos 60 dias',
  },
  {
    value: 'QUARTERLY_90',
    label: 'Trimestral',
    description: 'Útimos 3 meses',
  },
  {
    value: 'SEMESTERLY_180',
    label: 'Semestral',
    description: 'Útimos  6 meses',
  },
  {
    value: 'YEARLY_365',
    label: 'Anual',
    description: 'Útimos 12 meses',
  },
];
