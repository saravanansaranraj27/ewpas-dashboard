import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.scss'],
})
export class MetricCardComponent {
  label = input.required<string>();
  value = input.required<string | number>();
  unit = input<string>('');
  subText = input<string>('');
  icon = input<string>('info');
  tone = input<'water' | 'flow' | 'quality' | 'balance' | 'danger' | 'blue'>(
    'blue',
  );
  status = input<'normal' | 'warning' | 'critical'>('normal');
  percentage = input<number>();
  colorVar = input<string>('var(--accent)');
}
