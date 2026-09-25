import {
  SensorReading,
  WaterUsage,
  FinancialMetric,
} from '../models/ewpas.model';

export const PROTOTYPE_SENSOR_DATA: SensorReading[] = [
  {
    situation: 1,
    waterLevel: 'Alert',
    flowRate: '10.03–9.57',
    tds: 537,
    ph: 7,
    solenoid: 'Open',
    essentialUsage: 0,
    generalUsage: 7,
    preferenceActivated: false,
  },
  {
    situation: 2,
    waterLevel: 'High',
    flowRate: '9.57–9.10',
    tds: 537,
    ph: 7,
    solenoid: 'Open',
    essentialUsage: 15,
    generalUsage: 12,
    preferenceActivated: false,
  },
  {
    situation: 3,
    waterLevel: 'Medium',
    flowRate: '8.87–8.17',
    tds: 537,
    ph: 7,
    solenoid: 'Open',
    essentialUsage: 38,
    generalUsage: 12,
    preferenceActivated: false,
  },
  {
    situation: 4,
    waterLevel: 'Low',
    flowRate: '8.17–1.23',
    tds: 537,
    ph: 7,
    solenoid: 'Close',
    essentialUsage: 36,
    generalUsage: 17,
    preferenceActivated: true,
    waterLevelPercent: 20,
  },
];

export const WATER_FLOW = {
  threshold: 7.47,
  preferenceLevel: 7,
  preferenceFlowRate: 1.63,
};

export const USAGE_STATS: WaterUsage[] = [
  {
    purpose: 'Bathing',
    dailyUsage: 30,
  },
  {
    purpose: 'Drinking',
    dailyUsage: 100,
  },
  {
    purpose: 'Rest Room',
    dailyUsage: 100,
  },
  {
    purpose: 'Washing',
    dailyUsage: 380,
  },
  {
    purpose: 'Wash Basin',
    dailyUsage: 113,
  },
  {
    purpose: 'Kitchen Sink',
    dailyUsage: 50,
  },
  {
    purpose: 'Emergency Use',
    dailyUsage: 100,
  },
  {
    purpose: 'Cooking',
    dailyUsage: 10,
  },
  {
    purpose: 'Others',
    dailyUsage: 117,
  },
];

export const ALLOCATION_EXAMPLE = {
  allocated: 40.0,
  used: 0.85,
  remaining: 39.15,
};

export const COST_BREAKDOWN: FinancialMetric[] = [
  {
    label: 'Total Prototype Cost',
    value: '₹10,000.00',
    description: 'Total cost of the prototype',
  },
  {
    label: 'Water Container',
    value: '90 litre',
    description: '90 litre water container',
  },
  {
    label: 'Water Cost Per Year',
    value: '₹12,775',
    description: 'Cost of 1000 litres per day for one year',
  },
  {
    label: 'Expense Saved',
    value: '₹4,471.25',
    description: 'Expense saved from water usage',
  },
  {
    label: 'Rate of Return Per Year',
    value: '24.84%',
    description: 'Rate of return per year',
  },
];

export const LEVEL_THRESHOLDS = [
  {
    name: 'Alert',
    range: '100–80%',
  },
  {
    name: 'High',
    range: '80–60%',
  },
  {
    name: 'Medium',
    range: '60–20%',
  },
  {
    name: 'Low',
    range: '0-20%',
  },
];

export const SYSTEM_ACCURACY = {
  waterLevelCorrelation: 99.82,
  waterUsageCorrelation: 99.99,
};

export const DAILY_FAMILY_USAGE = 1000;
