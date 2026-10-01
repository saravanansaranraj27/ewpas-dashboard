import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MetricCardComponent } from '../../shared/components/metric-card/metric-card.component';

import {
  USAGE_STATS,
  PROTOTYPE_SENSOR_DATA,
  WATER_FLOW,
  SYSTEM_ACCURACY,
} from '../../core/data/ewpas.data';

interface ChartPoint {
  name: string;
  value: number;
}

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    NgxChartsModule,
    MatIconModule,
    MatCardModule,
    MetricCardComponent,
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lineChartContainer')
  private lineChartContainer?: ElementRef<HTMLElement>;

  activePieUsage = signal<ChartPoint | null>(null);

  activeLinePoint = signal<ChartPoint | null>(null);

  selectedLinePoint = signal<ChartPoint | null>(null);

  lineChartHovering = signal(false);

  activePieEntries: ChartPoint[] = [];

  private lineSelectionFrame?: number;
  private lineChartObserver?: MutationObserver;

  pieData: ChartPoint[] = USAGE_STATS.map((item) => ({
    name: item.purpose,
    value: item.dailyUsage,
  }));

  pieColors = [
    '#0284c7',
    '#06b6d4',
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#ec4899',
    '#14b8a6',
    '#64748b',
  ];

  lineData = [
    {
      name: 'Water Utilized',
      series: PROTOTYPE_SENSOR_DATA.map((item) => ({
        name: `Situation ${item.situation}`,
        value: item.essentialUsage + item.generalUsage,
      })),
    },
  ];

  analysisMetrics = [
    {
      category: 'Flow Threshold',
      title: `${WATER_FLOW.threshold} L/min`,
      description:
        'After the threshold limit, there is a steep drop in the flow.',
      icon: 'speed',
      tone: 'quality' as const,
      percentage: 100,
    },
    {
      category: 'Preference System',
      title: `${WATER_FLOW.preferenceLevel} cm / ${WATER_FLOW.preferenceFlowRate} L/min`,
      description:
        'The preference system activates at the point of intersection of water level and flow rate.',
      icon: 'tune',
      tone: 'flow' as const,
      percentage: 100,
    },
    {
      category: 'Water Level Correlation',
      title: `${SYSTEM_ACCURACY.waterLevelCorrelation}%`,
      description: 'The water level sensor has a correlation of about 99.82%.',
      icon: 'verified',
      tone: 'balance' as const,
      percentage: SYSTEM_ACCURACY.waterLevelCorrelation,
    },
    {
      category: 'Water Usage Correlation',
      title: `${SYSTEM_ACCURACY.waterUsageCorrelation}%`,
      description:
        'The statistical data and obtained sensor data are correlated with 99.99% accuracy.',
      icon: 'analytics',
      tone: 'water' as const,
      percentage: SYSTEM_ACCURACY.waterUsageCorrelation,
    },
  ];

  colorScheme: Color = {
    name: 'ewpas-pie',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: this.pieColors,
  };

  lineColorScheme: Color = {
    name: 'ewpas-line',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#38bdf8'],
  };

  lineTotal = this.lineData[0].series.reduce(
    (total, point) => total + point.value,
    0,
  );

  pieTotal = this.pieData.reduce((total, item) => total + item.value, 0);

  ngAfterViewInit(): void {
    this.startLineChartObserver();
    this.refreshSelectedLinePoint();
  }

  ngOnDestroy(): void {
    if (this.lineSelectionFrame) {
      cancelAnimationFrame(this.lineSelectionFrame);
    }

    this.lineChartObserver?.disconnect();
  }

  onPieHover(item: ChartPoint): void {
    this.activeLinePoint.set(null);
    this.selectedLinePoint.set(null);
    this.lineChartHovering.set(false);

    this.activePieUsage.set(item);
    this.activePieEntries = [item];
  }

  onPieChartEnter(): void {
    this.activeLinePoint.set(null);
    this.selectedLinePoint.set(null);
    this.lineChartHovering.set(false);
  }

  selectPieLegend(item: ChartPoint): void {
    this.activePieUsage.set(item);
    this.activePieEntries = [item];
  }

  onPieSelect(event: ChartPoint): void {
    if (!event?.name) {
      return;
    }

    const item = this.pieData.find((point) => point.name === event.name);

    if (!item) {
      return;
    }

    this.activePieUsage.set(item);
    this.activePieEntries = [item];
  }

  onPieLeave(): void {
    this.activePieUsage.set(null);
    this.activePieEntries = [];
  }

  onLineSelect(event: ChartPoint): void {
    const point = this.resolveLinePoint(event);

    if (!point) {
      return;
    }

    this.clearPieSelection();

    this.selectedLinePoint.set(point);
    this.activeLinePoint.set(point);
    this.lineChartHovering.set(false);

    this.refreshSelectedLinePoint();
  }

  onLineActivate(event: { value?: ChartPoint }): void {
    const point = event?.value ? this.resolveLinePoint(event.value) : null;

    if (!point) {
      return;
    }

    this.clearPieSelection();

    this.lineChartHovering.set(true);
    this.activeLinePoint.set(point);
  }

  onLineHover(point: ChartPoint): void {
    const resolved = this.findLinePoint(point.name);

    if (!resolved) {
      return;
    }

    this.clearPieSelection();

    this.lineChartHovering.set(true);
    this.activeLinePoint.set(resolved);
  }

  onLineChartEnter(): void {
    this.clearPieSelection();

    this.lineChartHovering.set(true);

    const selected = this.selectedLinePoint();

    if (selected) {
      this.activeLinePoint.set(selected);
    }

    this.refreshSelectedLinePoint();
  }

  selectLineLegend(point: ChartPoint): void {
    const selected = this.findLinePoint(point.name);

    if (!selected) {
      return;
    }

    this.clearPieSelection();

    this.selectedLinePoint.set(selected);
    this.activeLinePoint.set(selected);
    this.lineChartHovering.set(false);

    this.refreshSelectedLinePoint();

    setTimeout(() => {
      this.refreshSelectedLinePoint();
    }, 0);

    setTimeout(() => {
      this.refreshSelectedLinePoint();
    }, 50);

    setTimeout(() => {
      this.refreshSelectedLinePoint();
    }, 150);

    setTimeout(() => {
      this.refreshSelectedLinePoint();
    }, 300);
  }

  onLineLegendLeave(): void {
    const selected = this.selectedLinePoint();

    this.lineChartHovering.set(false);
    this.activeLinePoint.set(selected);

    this.refreshSelectedLinePoint();
  }

  previewSituationFour(): void {
    const situationFour = this.findLinePoint('Situation 4');

    if (!situationFour) {
      return;
    }

    this.activeLinePoint.set(situationFour);
    this.lineChartHovering.set(true);
  }

  selectSituationFour(): void {
    const situationFour = this.findLinePoint('Situation 4');

    if (!situationFour) {
      return;
    }

    this.clearPieSelection();

    this.selectedLinePoint.set(situationFour);
    this.activeLinePoint.set(situationFour);
    this.lineChartHovering.set(false);

    this.refreshSelectedLinePoint();

    setTimeout(() => {
      this.refreshSelectedLinePoint();
    }, 0);

    setTimeout(() => {
      this.refreshSelectedLinePoint();
    }, 50);

    setTimeout(() => {
      this.refreshSelectedLinePoint();
    }, 150);

    setTimeout(() => {
      this.refreshSelectedLinePoint();
    }, 300);
  }

  onLineLeave(): void {
    this.lineChartHovering.set(false);

    const selected = this.selectedLinePoint();

    this.activeLinePoint.set(selected);

    this.refreshSelectedLinePoint();
  }

  private clearPieSelection(): void {
    this.activePieUsage.set(null);
    this.activePieEntries = [];
  }

  private findLinePoint(name: string): ChartPoint | null {
    return this.lineData[0].series.find((point) => point.name === name) ?? null;
  }

  private resolveLinePoint(event: ChartPoint | null): ChartPoint | null {
    if (!event) {
      return null;
    }

    const directMatch = this.findLinePoint(event.name);

    if (directMatch) {
      return directMatch;
    }

    if (typeof event.value === 'number') {
      return (
        this.lineData[0].series.find((point) => point.value === event.value) ??
        null
      );
    }

    return null;
  }

  private startLineChartObserver(): void {
    const container = this.lineChartContainer?.nativeElement;

    if (!container) {
      return;
    }

    this.lineChartObserver?.disconnect();

    this.lineChartObserver = new MutationObserver(() => {
      this.refreshSelectedLinePoint();
    });

    this.lineChartObserver.observe(container, {
      childList: true,
      subtree: true,
    });
  }

  private refreshSelectedLinePoint(): void {
    if (this.lineSelectionFrame) {
      cancelAnimationFrame(this.lineSelectionFrame);
    }

    this.lineSelectionFrame = requestAnimationFrame(() => {
      this.applySelectedLinePoint();
    });
  }

  private applySelectedLinePoint(): void {
    const container = this.lineChartContainer?.nativeElement;

    if (!container) {
      return;
    }

    const svg = container.querySelector<SVGSVGElement>('svg');

    if (!svg) {
      return;
    }

    const linePath =
      svg.querySelector<SVGPathElement>('.line-series .line') ??
      svg.querySelector<SVGPathElement>('.line-series path');

    if (!linePath) {
      return;
    }

    const parent = linePath.parentElement;

    if (!(parent instanceof SVGGElement)) {
      return;
    }

    const pathPoints = this.getFinalLinePoints(svg);

    if (pathPoints.length < this.lineData[0].series.length) {
      return;
    }

    this.lineChartObserver?.disconnect();

    let layer = Array.from(parent.children).find(
      (element) =>
        element instanceof SVGGElement &&
        element.classList.contains('ewpas-point-layer'),
    ) as SVGGElement | undefined;

    if (!layer) {
      layer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      layer.setAttribute('class', 'ewpas-point-layer');
      layer.setAttribute('pointer-events', 'none');
      parent.appendChild(layer);
    }

    while (layer.firstChild) {
      layer.removeChild(layer.firstChild);
    }

    const selected = this.selectedLinePoint();

    const selectedIndex = selected
      ? this.lineData[0].series.findIndex(
          (point) => point.name === selected.name,
        )
      : -1;

    this.lineData[0].series.forEach((_, index) => {
      const point = pathPoints[index];

      if (!point) {
        return;
      }

      const isSelected = index === selectedIndex;

      const glow = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle',
      );

      glow.setAttribute('cx', String(point.x));
      glow.setAttribute('cy', String(point.y));
      glow.setAttribute('r', isSelected ? '15' : '9');
      glow.setAttribute('fill', '#38bdf8');
      glow.setAttribute('opacity', isSelected ? '0.3' : '0.18');
      glow.setAttribute('pointer-events', 'none');

      layer.appendChild(glow);

      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle',
      );

      circle.setAttribute('cx', String(point.x));
      circle.setAttribute('cy', String(point.y));
      circle.setAttribute('r', isSelected ? '9' : '5.5');
      circle.setAttribute('fill', isSelected ? '#67e8f9' : '#38bdf8');
      circle.setAttribute('stroke', '#ffffff');
      circle.setAttribute('stroke-width', isSelected ? '3' : '2.5');
      circle.setAttribute('pointer-events', 'none');
      circle.setAttribute(
        'class',
        isSelected ? 'ewpas-chart-point selected' : 'ewpas-chart-point',
      );

      layer.appendChild(circle);
    });

    this.lineChartObserver?.observe(container, {
      childList: true,
      subtree: true,
    });
  }

  private getFinalLinePoints(
    svg: SVGSVGElement,
  ): Array<{ x: number; y: number }> {
    const series = this.lineData[0].series;

    const xTicks = Array.from(
      svg.querySelectorAll<SVGGElement>('.x.axis .tick'),
    );

    const xPositions = xTicks
      .map((tick) => this.getTranslateX(tick))
      .filter((value): value is number => value !== null)
      .sort((a, b) => a - b);

    if (xPositions.length >= series.length) {
      const yPositions = this.getYPositions(svg);

      if (yPositions) {
        return series.map((point, index) => ({
          x: xPositions[index],
          y:
            yPositions.zero -
            (point.value / 60) * (yPositions.zero - yPositions.max),
        }));
      }
    }

    return this.getStableLinePathPoints(svg);
  }

  private getYPositions(
    svg: SVGSVGElement,
  ): { zero: number; max: number } | null {
    const ticks = Array.from(
      svg.querySelectorAll<SVGGElement>('.y.axis .tick'),
    );

    const values = ticks
      .map((tick) => {
        const text = tick.querySelector('text')?.textContent?.trim() ?? '';
        const value = Number(text);
        const y = this.getTranslateY(tick);

        if (!Number.isFinite(value) || y === null) {
          return null;
        }

        return { value, y };
      })
      .filter((item): item is { value: number; y: number } => item !== null);

    const zero = values.find((item) => item.value === 0);
    const max = values.find((item) => item.value === 60);

    if (!zero || !max) {
      return null;
    }

    return {
      zero: zero.y,
      max: max.y,
    };
  }

  private getTranslateX(element: SVGGElement): number | null {
    const transform = element.getAttribute('transform') ?? '';

    const match = transform.match(
      /translate\(\s*(-?\d*\.?\d+)(?:[,\s]+(-?\d*\.?\d+))?\s*\)/,
    );

    return match ? Number(match[1]) : null;
  }

  private getTranslateY(element: SVGGElement): number | null {
    const transform = element.getAttribute('transform') ?? '';

    const match = transform.match(
      /translate\(\s*(-?\d*\.?\d+)(?:[,\s]+(-?\d*\.?\d+))?\s*\)/,
    );

    return match ? Number(match[2] ?? 0) : null;
  }

  private getStableLinePathPoints(
    svg: SVGSVGElement,
  ): Array<{ x: number; y: number }> {
    const linePath =
      svg.querySelector<SVGPathElement>('.line-series .line') ??
      svg.querySelector<SVGPathElement>('.line-series path');

    if (!linePath) {
      return [];
    }

    const path = linePath.getAttribute('d') ?? '';

    return this.extractLinePoints(path);
  }

  private extractLinePoints(path: string): Array<{ x: number; y: number }> {
    const points: Array<{ x: number; y: number }> = [];

    const commandPattern =
      /[ML]\s*(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*[, ]\s*(-?\d*\.?\d+(?:e[-+]?\d+)?)/gi;

    let match: RegExpExecArray | null;

    while ((match = commandPattern.exec(path)) !== null) {
      points.push({
        x: Number(match[1]),
        y: Number(match[2]),
      });
    }

    return points;
  }
}
