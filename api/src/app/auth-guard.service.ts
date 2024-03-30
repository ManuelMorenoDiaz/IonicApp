import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = Cookies.get('token');
    const id_u = Cookies.get('id_u');

    if (token && id_u) {
      // Las cookies están establecidas, permitir la navegación
      return true;
    } else {
      // Las cookies no están establecidas, redirigir a la página de inicio
      this.router.navigate(['/']);
      return false;
    }
  }
}
