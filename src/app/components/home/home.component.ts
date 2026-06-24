import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MeanService } from '../../services/mean.service';
import { DEFAULT_AVATAR, User } from '../../interfaces/user';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { EditModalComponent } from '../actions/edit-modal/edit-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardModule,
    AvatarModule,
    ButtonModule,
    ProgressSpinnerModule,
    MessageModule,
    HeaderComponent,
    FooterComponent,
    EditModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  usuarios: User[] = [];
  readonly defaultAvatar = DEFAULT_AVATAR;
  loading = false;
  loadError = false;

  private readonly service = inject(MeanService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.loading = true;
    this.loadError = false;
    this.service
      .listarUsuarios()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          this.usuarios = res.data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.loadError = true;
          this.messageService.add({ severity: 'error', summary: 'No se ha podido obtener el listado de usuarios.' });
        },
      });
  }

  avatarSrc(usuario: User): string {
    return this.service.getAvatarUrl(usuario.avatar) ?? this.defaultAvatar;
  }

  onAddAction(usuario: User): void {
    this.usuarios.push(usuario);
  }

  onUpdAction(usuario: User): void {
    this.usuarios = this.usuarios.map(item => (item.id === usuario.id ? usuario : item));
  }

  eliminarUsuario(id: number): void {
    this.confirmationService.confirm({
      header: 'Confirmar',
      message: '¿Esta seguro de querer eliminar el registro?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Confirmar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.service
          .eliminarUsuario(id)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe({
            next: () => {
              this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
              this.messageService.add({ severity: 'success', summary: 'Usuario eliminado con éxito.', life: 1500 });
            },
            error: () => {
              this.messageService.add({ severity: 'error', summary: 'No se ha podido eliminar el usuario.' });
            },
          });
      },
    });
  }
}
