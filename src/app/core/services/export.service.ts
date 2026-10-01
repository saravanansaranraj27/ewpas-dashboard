import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';
import { USAGE_STATS, PROTOTYPE_SENSOR_DATA } from '../data/ewpas.data';

@Injectable({ providedIn: 'root' })
export class ExportService {
  exportAllData(filename = 'EWPAS_Report_Data.csv') {
    const rows: any[] = [];

    USAGE_STATS.forEach((item) => {
      rows.push({
        Type: 'Usage',
        Purpose: item.purpose,
        Daily_Usage_Liters: item.dailyUsage,
      });
    });

    PROTOTYPE_SENSOR_DATA.forEach((log) => {
      rows.push({
        Type: 'SensorLog',
        Situation: log.situation,
        Water_Level: log.waterLevel,
        Flow_Rate_LPM: log.flowRate,
        TDS_ppm: log.tds,
        pH: log.ph,
        Solenoid: log.solenoid,
        Essential_Usage_Liters: log.essentialUsage,
        General_Usage_Liters: log.generalUsage,
        Preference_Activated: log.preferenceActivated,
        Water_Level_Percent: log.waterLevelPercent ?? '',
      });
    });

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}
