import { Component, OnInit } from '@angular/core';
import {ApiConnexionForPartner} from "../services/api.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-contribution',
  templateUrl: './contribution.component.html',
  styleUrls: ['./contribution.component.css']
})
export class ContributionComponent implements OnInit {
  id = this.cookie.get('id');
  saleData!: { name: string, value: number }[];
  turnover!: string;


  constructor(private apiConnexionForPartner: ApiConnexionForPartner, public cookie: CookieService) { }

  ngOnInit(): void {
    const formData: FormData = new FormData();
    formData.append("action", "getInfos");
    formData.append("id", this.id);
    this.apiConnexionForPartner.ContributionPostService(formData).subscribe(res=>{
        this.saleData = res;
        console.log(res);
      },
      err=>{
        console.log(err);
      });
  }

  pay() {
    if (this.turnover === undefined) {
      alert("Veuillez entrer votre chiffre d'affaires.");
    }else {
      const formData: FormData = new FormData();
      formData.append("action", "payment");
      formData.append("id", this.id);
      formData.append("turnover", this.turnover);
      this.apiConnexionForPartner.ContributionPostService(formData).subscribe(res => {
        if (res === "false")
          alert("Vous avez deja payer la cautisation cette année.");
        else
          alert("Votre paiement de "+res+"€ a bien été effectué. Un justificatif pourra vous être demandé.");
          this.ngOnInit();
        },
        err => {
          console.log(err);
        });
    }
  }
}
