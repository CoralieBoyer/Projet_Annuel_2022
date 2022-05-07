import { Component } from '@angular/core';
import {OneSignal} from "onesignal-ngx";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WebApp';
  /*constructor(private oneSignal: OneSignal) {
    this.oneSignal.init({
      appId: "143381d9-3d3b-4d6f-85fc-b41930a66d26",
    });
  }*/
}
