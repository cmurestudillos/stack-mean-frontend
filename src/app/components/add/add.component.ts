import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MeanService } from 'src/app/services/mean.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Output() usuarios: any;

  usuario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
  });

  constructor(public service: MeanService, private router: Router) { }

  ngOnInit(): void {
  }

  getEmailErrorMessage() {
    if (this.usuario.value.email.hasError('required')) {
      return 'Debes introducir un correo';
    }

    return this.usuario.value.email.hasError('email') ? 'Email no valido' : '';
  }

  getFirtsNameErrorMessage() {
    return 'Debes introducir un nombre';
  }

  getLastNameErrorMessage() {
    return 'Debes introducir un apellido';
  }

  onSubmit(){
    Swal.fire({
      title: '¿Quieres guardar los cambios?',
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.agregarUsuario(this.usuario.value).subscribe(resp => {
          Swal.fire('Usuario guardado!', '', 'success');
          console.log(resp)
          // this.router.navigate(['/inicio']);
        });
      } else if (result.isDenied) {
        Swal.fire('Los datos no se han salvado', '', 'info')
      }
    })
  }

}
