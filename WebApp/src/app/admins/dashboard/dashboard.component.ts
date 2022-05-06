import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  element = "analyses";
  session!: string;
  user = this.cookie.get('user');

  constructor(public cookie: CookieService, public router:Router) { }

  ngOnInit(): void {
  }

  deconnexion(){
    this.cookie.delete('id');
    this.cookie.delete('user');
    this.router.navigate(['/']);
  }

  nav(selector: string){
    let buttons = window.document.getElementsByTagName("button");
    let item = window.document.getElementById(selector)!;
    this.element = selector;
    for (let i = 0; i < buttons.length; ++i)
      buttons[i].className = "w-full block py-1 md:py-3 pl-1 text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-blue-600";
    item.className = "w-full block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-600";
  }

}
