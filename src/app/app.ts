import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { LoadingIndicatorComponent } from './shared/components/loading-indicator/loading-indicator.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BackToTopComponent } from './shared/components/back-to-top/back-to-top.component';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoadingIndicatorComponent,
    NavbarComponent,
    BackToTopComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  isLoading = signal(true);

  private theme = inject(ThemeService);
  private router = inject(Router);
  private routerSubscription?: Subscription;

  private loadingStartedAt = performance.now();
  private navigationId = 0;

  ngOnInit(): void {
    this.theme.initTheme();

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.navigationId++;
        this.loadingStartedAt = performance.now();
        this.isLoading.set(true);
        return;
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        const currentNavigation = this.navigationId;
        const elapsed = performance.now() - this.loadingStartedAt;
        const remaining = Math.max(0, 700 - elapsed);

        window.setTimeout(() => {
          if (currentNavigation !== this.navigationId) {
            return;
          }

          requestAnimationFrame(() => {
            this.isLoading.set(false);
            window.scrollTo({
              top: 0,
              behavior: 'instant',
            });
          });
        }, remaining);
      }
    });

    window.setTimeout(() => {
      this.isLoading.set(false);
    }, 800);
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }
}
