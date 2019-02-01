import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor( public authService: AuthService ) { }

  // Debe de devolver un obsevable que sea verdadero o falso.
  canActivate() {
    return this.authService.isAuth();
  }

  /**
   * El método canLoad necesita recibir también un Observable, pero se queda a la escucha
   * de los cambios de ese obsevable. Entonces hay que decirle que ejecute una nueva instancia
   * cada vez que intente acceder a una nueva ruta.
   * El operador 'take' dice cuantas notificaciones debe emitir el Observable antes de cancelar la subcripción
   */
  canLoad() {
    return this.authService.isAuth().pipe(
      take(1)
    );
  }

}
