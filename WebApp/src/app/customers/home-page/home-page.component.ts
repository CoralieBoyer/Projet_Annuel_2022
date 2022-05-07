import { Component, OnInit } from '@angular/core';

import {ApiConnexion} from '../services/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  attributsPartner!: {id: string, id_user: string, name: string, siret: string, email: string, password: string, logo: string, link: string  }[];
  attributsPrestation!: {id: string, id_partner: string, id_product: string, name: string, reduction: string, price: string, description: string, image: string }[];
  attributsObjects!: {id: string, id_product: string, name: string, price: string, points: string, description: string, image: string }[];

  constructor(private apiConnexion: ApiConnexion) { }

  ngOnInit(): void {

    this.apiConnexion.HomeCustomerGetService().subscribe(res=>{
        console.log(res);
        this.attributsPartner = res.partners;
        this.attributsPrestation = res.prestations;
        this.attributsObjects = res.objects;
        console.log(this.attributsPrestation);
      },
      err=>{
        console.log(err);
      });


  }

}
