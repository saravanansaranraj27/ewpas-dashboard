import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'ewpas-theme';

  isDark = signal(false);

  constructor() {
    this.initTheme();
  }

  initTheme(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);

    if (stored === 'dark') {
      this.isDark.set(true);
    } else if (stored === 'light') {
      this.isDark.set(false);
    } else {
      this.isDark.set(
        window.matchMedia('(prefers-color-scheme: dark)').matches,
      );
    }

    this.applyTheme();
  }

  toggle(): void {
    this.isDark.update((value) => !value);

    localStorage.setItem(this.STORAGE_KEY, this.isDark() ? 'dark' : 'light');

    this.applyTheme();
  }

  private applyTheme(): void {
    const theme = this.isDark() ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', theme);

    document.body.setAttribute('data-theme', theme);
  }
}
