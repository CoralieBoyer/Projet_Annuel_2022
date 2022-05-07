import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  id = this.cookie.get('id');

  constructor(public cookie: CookieService, public translate: TranslateService) {
    translate.addLangs(['fr', 'en', 'de']);
    const browserLang = translate.getBrowserLang();
    if (browserLang != null) {
      translate.setDefaultLang(browserLang);
    }else{
      translate.setDefaultLang('en');
    }
  }

  ngOnInit(): void {
    console.log("id :" +  this.id)
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }

  deconnexion(){
    this.cookie.delete('id');
    this.cookie.delete('user');
    this.id = this.cookie.get('id');
  }

}
