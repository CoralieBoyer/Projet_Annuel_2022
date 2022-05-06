import { Component, OnInit } from '@angular/core';
import {ApiConnexionForPartner} from "../services/api.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-prestations',
  templateUrl: './prestations.component.html',
  styleUrls: ['./prestations.component.css']
})
export class PrestationsComponent implements OnInit {
  id = this.cookie.get('id');
  header = ["#", "Nom", "Image", "Description", "Prix", "Quantité", "Action"];
  attributs!: {description: string, id_product: string, image: string, name: string, price: string, quantity: string}[];
  newAttributs = {description: "", id_product: "", image: "", name: "", price: "", quantity: ""};

  constructor(private apiConnexionForPartner: ApiConnexionForPartner, public cookie: CookieService) { }

  ngOnInit(): void {
    const formData: FormData = new FormData();
    formData.append("action", "getInfos");
    formData.append("id", this.id);
    this.apiConnexionForPartner.PrestationsPostService(formData).subscribe(res=>{
        this.attributs = res;
        console.log(res);
      },
      err=>{
        console.log(err);
      });
  }

}
