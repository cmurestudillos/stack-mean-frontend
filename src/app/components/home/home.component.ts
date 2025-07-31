import { Component, Input, OnInit } from '@angular/core';
import { MeanService } from '../../services/mean.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  usuarios!: User[];
  usuario!: User;
  actionList!: string;
  editAction: boolean = false;

  constructor(public service: MeanService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.service.listarUsuarios().subscribe((res:any) => {
      this.usuarios = res.data;
    }); 
  }

  onAddAction( $event: any ) {
    this.usuarios.push($event);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Usuario añadido con exito.',
      showConfirmButton: false,
      timer: 1500
    })
  }
  
  onUpdAction( $event: any ) {
    this.usuarios = this.usuarios.map((item: any) => item.id === $event.id ? $event : item);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Usuario modificado con exito.',
      showConfirmButton: false,
      timer: 1500
    })
  }

  eliminarUsuario(id: number){
    // Verificar que va a eliminar el registro
    Swal.fire({
      title: '¿Esta seguro de querer eliminar el registro?',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      confirmButtonColor: '#198757',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#db3448',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.eliminarUsuario(id).subscribe(resp => {
          this.usuarios = this.usuarios.filter((value: any) => value.id !== id);
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario eliminado con exito.',
          showConfirmButton: false,
          timer: 1500
        })        
      }
    })    
  }

}
