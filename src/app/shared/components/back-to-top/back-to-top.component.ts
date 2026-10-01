import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-back-to-top',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.scss'],
})
export class BackToTopComponent {
  showButton = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showButton = window.scrollY > 350;
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
