// consejos.page.ts
import { Component, OnInit } from '@angular/core';
import { Consejo } from '../../interfaces/index';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-consejos',
  templateUrl: './consejos.page.html',
  styleUrls: ['./consejos.page.scss'],
})
export class ConsejosPage implements OnInit {
  public resp: Consejo[] = [];

  constructor(private newService: ApiService, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.newService.getConsejos().subscribe((resp) => {
      console.log(resp);
      if (Array.isArray(resp)) {
        this.resp = resp.map((item) => ({ ...item }));
      } else {
        this.resp = [{ ...resp }];
      }
    });
  }

  // Función para obtener una URL de video segura
  getSafeVideoUrl(videoId: string | undefined): SafeResourceUrl {
    if (!videoId) {
      return ''; // Return an empty string if videoId is undefined
    }
    const youtubeUrl = 'https://www.youtube.com/embed/';
    const fullUrl = youtubeUrl + videoId;
    return this.sanitizer.bypassSecurityTrustResourceUrl(fullUrl);
  }
}
