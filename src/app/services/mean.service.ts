import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class MeanService {
  private url: string = 'https://stack-api-service.vercel.app/api/usuarios';

  constructor(private _http: HttpClient) {}

  // Peticion para listar todos los usuarios
  listarUsuarios() {
    return this._http.get(this.url);
  }

  // Peticion para agregar usuario
  agregarUsuario(usuario: User): Observable<any> {
    return this._http.post(this.url, usuario).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  // Peticion para editar usuario
  editarUsuario(id: number, usuario: User) {
    return this._http.put(this.url + '/' + id, usuario).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  // Peticion para eliminar usuario
  eliminarUsuario(id: number) {
    return this._http.delete(this.url + '/' + id);
  }
}
