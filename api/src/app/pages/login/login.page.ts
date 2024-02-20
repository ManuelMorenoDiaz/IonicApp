import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin:FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController, private apiService: ApiService, private router: Router) {

    this.formularioLogin = this.fb.group({
      correo: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  async ingresar() {
    var form = this.formularioLogin.value;

    var usuario={
      correo: form.correo,
      contrasena: form.contrasena
    };

    this.apiService.loginUsuario(usuario).subscribe(response => {
      let a=JSON.parse(response);
      console.log(a);
      console.log(a.message);

      if (a.message == "Inicio de sesion correcto.") {
      console.log(response);
      this.router.navigate(['/tabs/tab1']);
      } else if(a.message === "Correo o contrasena incorrectos.") {
        this.alertController.create({
          header:"Datos Incorrectos",
          message: 'Revisa tu correo o contrasena correctamente',
          buttons: ['Guardar'],
        }).then(alert => alert.present());
      }
    });
  }

}
