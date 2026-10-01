import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PROTOTYPE_SENSOR_DATA } from '../../core/data/ewpas.data';

@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.scss',
})
export class MonitorComponent {
  sensorData = PROTOTYPE_SENSOR_DATA;

  get latestSensor() {
    return this.sensorData[this.sensorData.length - 1];
  }
}
