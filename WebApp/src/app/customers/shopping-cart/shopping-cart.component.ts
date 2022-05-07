import { Component, OnInit } from '@angular/core';
import {ApiConnexion} from "../services/api.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  idUser = this.cookie.get('id');
  attributsBasket!: {id_product: string, count: string, name: string, price: string, image: string}[];
  idBasket!: string;
  total: number = 0;
  points: number = 0;
  totalPoints: number = 0;
  showModal = false;
  address!: string;
  city!: string;
  zip_code!: string;

  cardNumber!: string;
  expiryMonth!: string;
  expiryYear!: string;
  cvc!: string;
  message!: string;
  response!: {
    client_ip: string,
    card: { brand: string, country: string, exp_month: string, exp_year: string, last4: string }
  };

  constructor(private apiConnexion: ApiConnexion, public cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    const formData: FormData = new FormData();
    formData.append("action", "getInfos");
    formData.append("id", this.idUser);
    this.apiConnexion.ShoppingCartPostService(formData).subscribe(res => {
        console.log(res);
        this.attributsBasket = res.baskets;
        this.idBasket = res.idBaskets;
        this.totalPoints = res.infos['points'];
        console.log(this.attributsBasket);
        for (let i = 0; i < this.attributsBasket.length; i++) {
          this.total += parseInt(this.attributsBasket[i].price) * parseInt(this.attributsBasket[i].count);
        }
      },
      err => {
        console.log(err);
      });
  }

  delete(idProduct: string) {
    const formData: FormData = new FormData();
    formData.append("action", "delete");
    formData.append("id_product", idProduct);
    formData.append("id_basket", this.idBasket);
    this.apiConnexion.ShoppingCartPostService(formData).subscribe(res => {
        this.initData();
        window.location.reload();
      },
      err => {
        console.log(err);
      });
  }

  quantity(id : string, count: string){
    console.log("quantité : "+ count +" / produit :"+id);
  }

  toggleModal() {
    let deliveryMessage = window.document.getElementById('deliveryMessage')!;
    let message = window.document.getElementById('message')!;
    message.innerHTML = "";
    deliveryMessage.innerHTML = "";
    if(this.address === undefined || this.city === undefined || this.zip_code === undefined)
      deliveryMessage.innerHTML = "Veuillez remplir tous les champs";
    else if (this.total < this.points*0.2)
      message.innerHTML = "Le montant à payer ne peux pas être négatif.";
    else if (this.totalPoints < this.points)
      message.innerHTML = "Votre solde de points est inférrieur au montant que vous avez entré.";
    else
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
        formData.append("id", this.idUser);
        formData.append("number_credit_card", this.response.card.last4);
        formData.append("brand", this.response.card.brand);
        formData.append("country", this.response.card.country);
        formData.append("exp_month", this.response.card.exp_month);
        formData.append("exp_year", this.response.card.exp_year);
        formData.append("client_ip", this.response.client_ip);
        formData.append("amount", this.total.toString());
        formData.append("id_basket", this.idBasket);
        this.apiConnexion.ShoppingCartPostService(formData).subscribe(res => {
            console.log(res);
            this.router.navigate(['payment']).then(() => {
              window.location.reload();
            });
          },
          err => {
            console.log(err);
          });
        ///////////////////////////////
      } else {
        this.message = response.error.message;
      }
    });
  }
}
