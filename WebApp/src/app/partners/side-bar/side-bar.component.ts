import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(public cookie: CookieService, public router:Router) { }

  ngOnInit(): void {
  }

  deconnexion(){
    this.cookie.delete('id');
    this.cookie.delete('user');
    this.router.navigate(['/']);
  }

}
