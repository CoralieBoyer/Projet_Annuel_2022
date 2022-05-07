import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ApiConnexion} from "../services/api.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  attributsProduce!: { id: string, name: string, points: string, description: string, image: string, price: string };
  attributsRating!: {comments: string, created: string, rating_number: string, title: string}[];
  emptyStar = "<path fill=\"currentColor\" d=\"M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z\"></path>";
  fillStar = "<path fill=\"currentColor\" d=\"M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z\"></path>";
  idUser = this.cookie.get('id');
  showModal = false;

  cardNumber!: string;
  expiryMonth!: string;
  expiryYear!: string;
  cvc!: string;
  message!: string;
  response!: {
    client_ip: string,
    card: { brand: string, country: string, exp_month: string, exp_year: string, last4: string }
  };

  constructor(private apiConnexion: ApiConnexion, private route: ActivatedRoute, public cookie: CookieService, private router: Router) {
  }

  rating = { note : "" , title: "", comment: ""};
  id!: string;

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id']; //Recupere l'id du produit qui est dans l'url
    console.log(this.id);
    const formData: FormData = new FormData();
    formData.append("id", this.id);
    this.apiConnexion.ProducePostService(formData).subscribe(res => {
        console.log(res);
        this.attributsProduce = res.product;
        this.attributsRating = res.rating;
      },
      err => {
        console.log(err);
      });
  }

  starsRating(index: number){
    let stars = document.getElementsByClassName("starRating")!;
    this.rating.note = (index+1).toString();
    for (let i = 0; i < stars.length; i++)
      stars[i].innerHTML = this.emptyStar;
    for (let i = 0; i <= index; i++)
      stars[i].innerHTML = this.fillStar;
  }

  CommentSending(){
    let message = window.document.getElementById("messageComment")!;
    message.innerHTML = "";
    if (this.idUser.length == 0){
      message.innerHTML = "Vous devez être connecté.";
      message.className = "text-red-600";
    }else {
      if (this.rating.note == "" || this.rating.title == "") {
        message.innerHTML = "Donnez une note et un titre.";
        message.className = "text-red-600";
      } else {
        const formData: FormData = new FormData();

        formData.append("id", this.id);
        formData.append("note", this.rating.note);
        formData.append("title", this.rating.title);
        formData.append("comment", this.rating.comment);
        formData.append("user", this.idUser);
        this.apiConnexion.ProducePostService(formData).subscribe(res => {
            this.ngOnInit();
            message.innerHTML = "Commentaire ajouté.";
            message.className = "text-green-600";
          },
          err => {
            console.log(err);
          });
      }
    }
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  addBasket(){
    const formData: FormData = new FormData();
    formData.append("action", "addBasket");
    formData.append("idProduct", this.id);
    formData.append("idUser", this.idUser);
    this.apiConnexion.ProducePostService(formData).subscribe(res => {
        alert("Produit ajouté au panier.");
      },
      err => {
        console.log(err);
      });
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
        console.log(this.response);
        const formData: FormData = new FormData();
        formData.append("action", "payment");
        formData.append("id", this.idUser);
        formData.append("number_credit_card", this.response.card.last4);
        formData.append("brand", this.response.card.brand);
        formData.append("country", this.response.card.country);
        formData.append("exp_month", this.response.card.exp_month);
        formData.append("exp_year", this.response.card.exp_year);
        formData.append("client_ip", this.response.client_ip);
        formData.append("amount", this.attributsProduce.price);
        formData.append("id_product", this.id);
        this.apiConnexion.ProducePostService(formData).subscribe(res => {
            console.log("reoind" + res);
            // navigate and reload page
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
