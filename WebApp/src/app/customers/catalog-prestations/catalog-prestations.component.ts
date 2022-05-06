import { Component, OnInit } from '@angular/core';
import {ApiConnexion} from "../services/api.service";

@Component({
  selector: 'app-catalog-prestations',
  templateUrl: './catalog-prestations.component.html',
  styleUrls: ['./catalog-prestations.component.css']
})
export class CatalogPrestationsComponent implements OnInit {
  attributsProduces!: {description: string, id_product: string, id_partner: string, image: string, name: string,price: string}[];

  constructor(private apiConnexion: ApiConnexion) { }

  ngOnInit(): void {
    const formData: FormData = new FormData();
    formData.append("action", "getInfos");
    this.apiConnexion.HomeCustomerPostService(formData).subscribe(res=>{
        console.log(res.prestations)
        this.attributsProduces = res.prestations;
      },
      err=>{
        console.log(err);
      });
  }

}
