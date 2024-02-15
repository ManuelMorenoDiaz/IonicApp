import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin:FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController) {

    this.formularioLogin = this.fb.group({
      correo: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  async ingresar(){
    var form = this.formularioLogin.value;


    if(.correo === form.correo && .contrasena === .contrasena){
        console.log("Inicio de Sesion Correcto");

    }else{
      const alert = await this.alertController.create({
        header:"Datos Incorrectos",
        message: 'Revisa tu correo o contraseña correctamente',
        buttons: ['Guardar'],
      });

      await alert.present();
    }
  }
}
