import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  id = this.cookie.get('id');
  constructor(public cookie: CookieService) { }

  ngOnInit(): void {
    console.log("id :" +  this.id)
  }
  deconnexion(){
    this.cookie.delete('id');
    this.cookie.delete('user');
    this.id = this.cookie.get('id');
  }
}
