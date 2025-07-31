import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { MeanService } from 'src/app/services/mean.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent {
  @Input() tituloModal!: string;
  @Input() usuario!: User;
  @Output() editAction: EventEmitter<any> = new EventEmitter();
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('formUsuario') formUsuario!: NgForm;

  usuarioData: any = {};

  editForm =  this.fb.group({
    email: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
 });

  constructor(public service: MeanService, private fb: FormBuilder) {};

  setValue(){
    this.editForm.setValue({
      email: this.usuario.email,
      first_name: this.usuario.first_name,
      last_name: this.usuario.last_name
    })
  }

  editarUsuario(usuario: any, id: number) {
    this.service.editarUsuario(id, usuario.value).subscribe((resp) => {
      this.usuario.email = resp.email;
      this.usuario.first_name = resp.first_name;
      this.usuario.last_name = resp.last_name;
      this.editAction.emit(this.usuario);
    });
    this.closeModal.nativeElement.click();
  }

  getEmailErrorMessage() {
    if (this.editForm.value.email.hasError('required')) {
      return 'Debes introducir un correo';
    }
    return this.editForm.value.email.hasError('email') ? 'Email no valido' : '';
  }

  getFirtsNameErrorMessage() {
    return 'Debes introducir un nombre';
  }

  getLastNameErrorMessage() {
    return 'Debes introducir un apellido';
  }

  resetForm(){
    this.editForm.value.email = '';
    this.editForm.value.first_name = '';
    this.editForm.value.last_name = '';
  }

}
