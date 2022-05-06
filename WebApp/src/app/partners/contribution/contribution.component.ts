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

  showModal = false;
  address!: string;
  city!: string;
  zip_code!: string;

  cardNumber!: string;
  expiryMonth!: string;
  expiryYear!: string;
  cvc!: string;
  response!: {
    client_ip: string,
    card: { brand: string, country: string, exp_month: string, exp_year: string, last4: string }
  };

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

  toggleModal() {
    this.showModal = !this.showModal;
  }

  getToken() {
    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        // API ///////////////////////////
        this.response = response;
        const formData: FormData = new FormData();
        formData.append("action", "payment");
        formData.append("id", this.id);
        formData.append("number_credit_card", this.response.card.last4);
        formData.append("brand", this.response.card.brand);
        formData.append("country", this.response.card.country);
        formData.append("exp_month", this.response.card.exp_month);
        formData.append("exp_year", this.response.card.exp_year);
        formData.append("client_ip", this.response.client_ip);
        formData.append("turnover", this.turnover);
        this.apiConnexionForPartner.ContributionPostService(formData).subscribe(res => {
            console.log(res);
            alert("Votre paiement a bien été effectué");
            this.toggleModal();
          },
          err => {
            console.log(err);
          });
        ///////////////////////////////
      } else {
        console.log(response.error.message);
        alert("Votre paiement a échoué, vérifiez vos informations.");
      }
    });
  }

  addContribution(){
    const formData: FormData = new FormData();
    formData.append("action", "addContribution");
    formData.append("id", this.id);
    formData.append("turnover", this.turnover);
    this.apiConnexionForPartner.ContributionPostService(formData).subscribe(res=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      });
  }}
