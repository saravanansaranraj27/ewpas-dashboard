export interface SensorReading {
  situation: number;
  waterLevel: 'Alert' | 'High' | 'Medium' | 'Low';
  flowRate: string;
  tds: number;
  ph: number;
  solenoid: 'Open' | 'Close';
  essentialUsage: number;
  generalUsage: number;
  preferenceActivated: boolean;
  waterLevelPercent?: number;
}

export interface WaterUsage {
  purpose: string;
  dailyUsage: number;
}

export interface FinancialMetric {
  label: string;
  value: string;
  description: string;
}

export interface LevelThreshold {
  name: string;
  range: string;
}
