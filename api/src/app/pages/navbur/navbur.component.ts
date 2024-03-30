import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-navbur',
  templateUrl: './navbur.component.html',
  styleUrls: ['./navbur.component.scss'],
})
export class NavburComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  redi(link:string) {
    this.router.navigateByUrl(`/${link}`);
   }

   cerrarSesion() {
    // Eliminar las cookies
    Cookies.remove('token');
    Cookies.remove('id_u');

    // Redirigir al usuario a la página principal
    this.router.navigate(['']);
  }

}


