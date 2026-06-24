import { Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { User } from '../../../interfaces/user';
import { ThemeService } from '../../../services/theme.service';
import { AddModalComponent } from '../../actions/add-modal/add-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, ButtonModule, AddModalComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() addAction = new EventEmitter<User>();
  @ViewChild('addModal') addModal!: AddModalComponent;

  readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  readonly items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => this.router.navigate(['/inicio']),
    },
    {
      label: 'Añadir',
      icon: 'pi pi-plus',
      command: () => this.addModal.open(),
    },
  ];

  onChangeData(usuario: User): void {
    this.addAction.emit(usuario);
  }
}
