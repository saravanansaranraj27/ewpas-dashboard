import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loading-indicator',
  standalone: true,
  templateUrl: './loading-indicator.component.html',
  styleUrl: './loading-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingIndicatorComponent {}
