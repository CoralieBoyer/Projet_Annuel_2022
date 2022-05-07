import { Component, OnInit } from '@angular/core';
import {ApiConnexionForPartner} from "../services/api.service";
import {CookieService} from "ngx-cookie-service";
import {select} from "d3-selection";

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  id = this.cookie.get('id');
  contribution = false;
  countPrestations = 0;
  pricePrestations = 0;
  countPrestationsSold = 0;
  pricePrestationsSold = 0;
  now = new Date().getFullYear().toString();
  year = this.now;
  firstContribution = this.now;
  select = [] as any;
  saleData!: {name: string, value: string}[];

  constructor(private apiConnexionForPartner: ApiConnexionForPartner, public cookie: CookieService) { }

  ngOnInit(): void {
    this.getStats();
  }

  getStats(){
    const formData: FormData = new FormData();
    formData.append("id", this.id);
    formData.append("year", this.year);
    this.apiConnexionForPartner.StatistiquesPostService(formData).subscribe(res=>{
        this.contribution = res.contribution;
        this.firstContribution = res.firstContribution;
        this.countPrestations = res.countPrestations;
        this.pricePrestations = res.pricePrestations;
        this.countPrestationsSold = res.countPrestationsSold;
        this.pricePrestationsSold = res.pricePrestationsSold;
        console.log(res.saleData);
        this.saleData = res.saleData;
        let index = 0;
        for (let i = parseInt(this.firstContribution); i <= parseInt(this.now); i++, index++) {
          this.select[index] = i.toString();
        }
      },
      err=>{
        console.log(err);
      });
  }

  onChange(event: any) {
    let select = window.document.getElementById("years")!;
    this.year = event.options[event.selectedIndex].value;
    this.getStats();
  }
}
