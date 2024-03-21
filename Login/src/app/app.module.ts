import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideStorage, getStorage } from '@angular/fire/storage';



const firebaseConfig = {
  apiKey: "AIzaSyBlBLPhSlNAVxm8uJHBgXMrvqoKU6Bi_b8",
  authDomain: "finanzas-3d4ac.firebaseapp.com",
  projectId: "finanzas-3d4ac",
  storageBucket: "finanzas-3d4ac.appspot.com",
  messagingSenderId: "224305171749",
  appId: "1:224305171749:web:e70f04263517403dc59ecc",
  measurementId: "G-VF93LD7MZ5"
};


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
