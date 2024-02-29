import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


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

}


