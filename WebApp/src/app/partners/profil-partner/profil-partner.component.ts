import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ApiConnexionForPartner} from "../services/api.service";

@Component({
  selector: 'app-profil-partner',
  templateUrl: './profil-partner.component.html',
  styleUrls: ['./profil-partner.component.css']
})
export class ProfilPartnerComponent implements OnInit {
  attributsPartner!: {email: string, logo: string, link: string, name: string, password:string, siret: string, start_partnership: string, status: string};
  id = this.cookie.get('id');

  constructor(private apiConnexionForPartner: ApiConnexionForPartner, private cookie: CookieService) { }

  ngOnInit(): void {
    const formData: FormData = new FormData();
    formData.append("id", this.id);
    this.apiConnexionForPartner.ProfilePostService(formData).subscribe(res=>{
        this.attributsPartner = res;
        console.log(res);
      },
      err=>{
        console.log(err);
      });
  }

  modify(){
    const formData: FormData = new FormData();
    formData.append("action", "modify");
    formData.append("id", this.id);
    formData.append("link", this.attributsPartner.link);
    formData.append("siret", this.attributsPartner.siret);
    this.apiConnexionForPartner.ProfilePostService(formData).subscribe(res=>{
        alert("Modifications effectuées.");
      },
      err=>{
        console.log(err);
      });
  }

}
