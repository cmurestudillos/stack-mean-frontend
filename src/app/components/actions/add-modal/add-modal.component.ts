import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MeanService } from '../../../services/mean.service';
import { DEFAULT_AVATAR, User } from '../../../interfaces/user';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, InputTextModule, FloatLabelModule, ButtonModule],
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css'],
})
export class AddModalComponent {
  @Input() tituloModal!: string;
  @Output() addAction = new EventEmitter<User>();

  visible = signal(false);

  usuario = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    first_name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    last_name: new FormControl('', { nonNullable: true, validators: Validators.required }),
    avatar: new FormControl(DEFAULT_AVATAR, { nonNullable: true }),
  });

  private readonly service = inject(MeanService);
  private readonly messageService = inject(MessageService);

  open(): void {
    this.visible.set(true);
  }

  getEmailErrorMessage(): string {
    const email = this.usuario.get('email');
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

  addUser(): void {
    this.service.agregarUsuario(this.usuario.getRawValue()).subscribe({
      next: resp => {
        this.addAction.emit(resp);
        this.visible.set(false);
        this.usuario.reset({ avatar: DEFAULT_AVATAR });
        this.messageService.add({ severity: 'success', summary: 'Usuario añadido con éxito.', life: 1500 });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'No se ha podido crear el usuario.' });
      },
    });
  }
}
