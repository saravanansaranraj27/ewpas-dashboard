import { Component, HostListener, inject, signal } from '@angular/core';

import { NavigationEnd, Router, RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { filter } from 'rxjs';

import { ThemeService } from '../../../core/services/theme.service';
import { ExportService } from '../../../core/services/export.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  theme = inject(ThemeService);

  exportService = inject(ExportService);

  private router = inject(Router);

  isMobileMenuOpen = signal(false);

  activePath = signal('/');

  navItems = [
    {
      path: '/',
      label: 'Overview',
      icon: 'home',
    },
    {
      path: '/monitor',
      label: 'Monitoring',
      icon: 'monitor_heart',
    },
    {
      path: '/analytics',
      label: 'Analytics',
      icon: 'bar_chart',
    },
    {
      path: '/compliance',
      label: 'Cost',
      icon: 'payments',
    },
  ];

  constructor() {
    this.activePath.set(this.router.url.split('?')[0]);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigation = event as NavigationEnd;

        this.activePath.set(navigation.urlAfterRedirects.split('?')[0]);

        this.closeMobileMenu();
      });
  }

  isActive(path: string): boolean {
    return this.activePath() === path;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((value) => !value);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 769) {
      this.closeMobileMenu();
    }
  }
}
