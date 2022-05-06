import { Component, OnInit } from '@angular/core';
import {ApiConnexion} from "../services/api.service";

@Component({
  selector: 'app-catalog-objects',
  templateUrl: './catalog-objects.component.html',
  styleUrls: ['./catalog-objects.component.css']
})
export class CatalogObjectsComponent implements OnInit {
  attributsProduces!: {description: string, id_product: string, id_partner: string, image: string, name: string, price: string}[];

  constructor(private apiConnexion: ApiConnexion) { }

  ngOnInit(): void {
    const formData: FormData = new FormData();
    formData.append("action", "getInfos");
    this.apiConnexion.HomeCustomerPostService(formData).subscribe(res=>{
        this.attributsProduces = res.objects;
      },
      err=>{
        console.log(err);
      });
  }

}
