import { Injectable, signal } from '@angular/core';

const DARK_MODE_KEY = 'app-dark-mode';
const DARK_MODE_CLASS = 'app-dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal(localStorage.getItem(DARK_MODE_KEY) === 'true');

  constructor() {
    document.documentElement.classList.toggle(DARK_MODE_CLASS, this.isDark());
  }

  toggleDarkMode(): void {
    const next = !this.isDark();
    this.isDark.set(next);
    document.documentElement.classList.toggle(DARK_MODE_CLASS, next);
    localStorage.setItem(DARK_MODE_KEY, String(next));
  }
}
