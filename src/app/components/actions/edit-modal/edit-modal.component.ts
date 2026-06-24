import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MeanService } from '../../../services/mean.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, InputTextModule, FloatLabelModule, ButtonModule],
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent {
  @Input() tituloModal!: string;
  @Input() usuario!: User;
  @Output() editAction = new EventEmitter<User>();

  visible = signal(false);

  private readonly fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  editForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    avatar: [''],
  });

  private readonly service = inject(MeanService);
  private readonly messageService = inject(MessageService);

  open(): void {
    this.editForm.setValue({
      email: this.usuario.email,
      first_name: this.usuario.first_name,
      last_name: this.usuario.last_name,
      avatar: this.usuario.avatar,
    });
    this.visible.set(true);
  }

  editarUsuario(): void {
    this.service.editarUsuario(this.usuario.id, this.editForm.getRawValue()).subscribe({
      next: resp => {
        this.usuario = { ...this.usuario, ...resp };
        this.editAction.emit(this.usuario);
        this.visible.set(false);
        this.messageService.add({ severity: 'success', summary: 'Usuario modificado con éxito.', life: 1500 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'No se ha podido modificar el usuario.' });
      },
    });
  }

  getEmailErrorMessage(): string {
    const email = this.editForm.get('email');
    if (email?.hasError('required')) {
      return 'Debes introducir un correo';
    }
    return email?.hasError('email') ? 'Email no valido' : '';
  }

  getFirtsNameErrorMessage(): string {
    return 'Debes introducir un nombre';
  }

  getLastNameErrorMessage(): string {
    return 'Debes introducir un apellido';
  }
}
