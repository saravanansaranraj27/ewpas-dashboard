import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MetricCardComponent } from '../../shared/components/metric-card/metric-card.component';
import {
  PROTOTYPE_SENSOR_DATA,
  ALLOCATION_EXAMPLE,
} from '../../core/data/ewpas.data';
import { ExportService } from '../../core/services/export.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MetricCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  exportService = inject(ExportService);

  latestSensor = PROTOTYPE_SENSOR_DATA[PROTOTYPE_SENSOR_DATA.length - 1];

  allocation = ALLOCATION_EXAMPLE;
}
