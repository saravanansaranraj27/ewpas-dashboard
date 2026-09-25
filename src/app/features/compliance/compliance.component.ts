import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MetricCardComponent } from '../../shared/components/metric-card/metric-card.component';
import { COST_BREAKDOWN, LEVEL_THRESHOLDS } from '../../core/data/ewpas.data';

@Component({
  selector: 'app-compliance',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MetricCardComponent],
  templateUrl: './compliance.component.html',
  styleUrls: ['./compliance.component.scss'],
})
export class ComplianceComponent {
  costs = COST_BREAKDOWN;
  thresholds = LEVEL_THRESHOLDS;

  getMetricTone(
    label: string,
  ): 'water' | 'flow' | 'quality' | 'balance' | 'danger' | 'blue' {
    switch (label) {
      case 'Total Prototype Cost':
        return 'danger';
      case 'Water Container':
        return 'water';
      case 'Water Cost Per Year':
        return 'quality';
      case 'Expense Saved':
        return 'balance';
      case 'Rate of Return Per Year':
        return 'flow';
      default:
        return 'blue';
    }
  }

  getMetricIcon(label: string): string {
    switch (label) {
      case 'Total Prototype Cost':
        return 'payments';
      case 'Water Container':
        return 'water_drop';
      case 'Water Cost Per Year':
        return 'receipt_long';
      case 'Expense Saved':
        return 'trending_down';
      case 'Rate of Return Per Year':
        return 'percent';
      default:
        return 'info';
    }
  }

  getMetricPercentage(label: string): number {
    switch (label) {
      case 'Total Prototype Cost':
        return 100;
      case 'Water Container':
        return 100;
      case 'Water Cost Per Year':
        return 100;
      case 'Expense Saved':
        return 100;
      case 'Rate of Return Per Year':
        return 24.84;
      default:
        return 0;
    }
  }

  getThresholdWidth(name: string): number {
    switch (name) {
      case 'Alert':
      case 'High':
        return 20;
      case 'Medium':
        return 40;
      case 'Low':
        return 20;
      default:
        return 0;
    }
  }

  getThresholdColor(name: string): string {
    switch (name) {
      case 'Alert':
        return '#10b981';
      case 'High':
        return '#22d3ee';
      case 'Medium':
        return '#f59e0b';
      case 'Low':
        return '#ef4444';
      default:
        return '#94a3b8';
    }
  }
}
