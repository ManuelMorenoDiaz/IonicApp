import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro:FormGroup;

  constructor(public fb: FormBuilder, private apiService: ApiService, public alertController: AlertController, private router: Router) {

    this.formularioRegistro = this.fb.group({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      contrasena: new FormControl('', Validators.required),
      contrasena2: new FormControl('', Validators.required)

    });
  }

  ngOnInit() {
  }


  async registrar(){

    var form = this.formularioRegistro.value;
    var usuario= {
      nombre: form.nombre,
      correo: form.correo,
      contrasena: form.contrasena
    };

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header:"Datos Incompletos",
        message: 'Debes completar todos los campos para poder registrarte',
        buttons: ['Guardar'],
      });

      await alert.present();
      return;

    }else{
      if(form.contrasena!= form.contrasena2){
        const alert = await this.alertController.create({
          header:"Datos Incompletos",
          message: 'Las contraseñas no coinciden',
          buttons: ['Guardar'],
        });

        await alert.present();
        return;

      }else{
        this.apiService.insertarUsuario(usuario).subscribe(response => {
          console.log(response.message);
          this.router.navigate(['/login']);
        });
      }
    }


  }
}
