import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../interfaces/user';

export interface UsuariosResponse {
  data: User[];
}

@Injectable({
  providedIn: 'root',
})
export class MeanService {
  private readonly url = environment.apiUrl;
  private readonly http = inject(HttpClient);

  // Peticion para listar todos los usuarios
  listarUsuarios(): Observable<UsuariosResponse> {
    return this.http.get<UsuariosResponse>(this.url);
  }

  // Peticion para agregar usuario
  agregarUsuario(usuario: Partial<User>): Observable<User> {
    return this.http.post<User>(this.url, usuario);
  }

  // Peticion para editar usuario
  editarUsuario(id: number, usuario: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.url}/${id}`, usuario);
  }

  // Peticion para eliminar usuario
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  // reqres.in sirve sus avatares con `Cross-Origin-Resource-Policy: same-origin`, por lo que el
  // navegador bloquea cargarlos directamente desde el frontend. Los servimos a través de nuestro
  // propio backend (ver /api/usuarios/avatar) para evitar ese bloqueo.
  getAvatarUrl(avatar: string | undefined): string | null {
    if (!avatar) {
      return null;
    }
    const origin = new URL(this.url).origin;
    return `${origin}/api/usuarios/avatar?url=${encodeURIComponent(avatar)}`;
  }
}
