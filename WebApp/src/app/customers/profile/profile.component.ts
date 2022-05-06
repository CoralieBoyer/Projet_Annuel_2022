import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {ApiConnexion} from "../services/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  attributsUser!: {id: string, name: string, email: string, password: string};
  attributsCustomer!: {id: string, firstname: string, address: string, city: string, phone_number: string, zip_code: string};
  attributsBasket!: {id: string, data_validation: string, count: string, name: string, price: string}[][];
  idBaskets!: {id: string, date_validation: string}[];
  password = {new: "", old: ""};
  id = this.cookie.get('id');

  constructor(private apiConnexion: ApiConnexion, private cookie: CookieService) {}

  ngOnInit(): void {
    const formData: FormData = new FormData();
    formData.append("action", "get");
    formData.append("id", this.id);
    this.apiConnexion.ProfilPostService(formData).subscribe(res=>{
        this.attributsUser = res.user;
        this.attributsCustomer = res.customer;
        this.attributsBasket = res.baskets;
        this.idBaskets = res.idBaskets;
        console.log(res);
      },
      err=>{
        console.log(err);
      });
  }

  modifyPassword(){
    let message = window.document.getElementById("messagePassword")!;
    if (this.password.old == "" || this.password.new == "")
      message.innerHTML = "Remplir tous les champs";
    else {
      const formData: FormData = new FormData();
      formData.append("action", "modifyPassword");
      formData.append("id", this.id);
      formData.append("name", this.attributsUser.name);
      formData.append("email", this.attributsUser.email);
      formData.append("old", this.password.old);
      formData.append("new", this.password.new);
      this.apiConnexion.ProfilPostService(formData).subscribe(res => {
          if (res.message == "false")
            message.innerHTML = "L'ancien mot de passe est incorrecte.";
          else {
            message.innerHTML = "Modifications effectuées.";
            this.password.old = "";
            this.password.new = "";
          }
        },
        err => {
          console.log(err);
        });
    }
  }

  modifyInfos(){
    let message = window.document.getElementById("messageInfos")!;
    if (this.attributsUser.name == "" || this.attributsCustomer.firstname == "" || this.attributsCustomer.address == "" || this.attributsCustomer.city == "" || this.attributsCustomer.phone_number == "" || this.attributsCustomer.zip_code == "")
      message.innerHTML = "Remplir tous les champs";
    else {
      const formData: FormData = new FormData();
      formData.append("action", "modifyInfos");
      formData.append("id", this.id);
      formData.append("name", this.attributsUser.name);
      formData.append("firstname", this.attributsCustomer.firstname);
      formData.append("address", this.attributsCustomer.address);
      formData.append("city", this.attributsCustomer.city);
      formData.append("phone_number", this.attributsCustomer.phone_number);
      formData.append("zip_code", this.attributsCustomer.zip_code);
      this.apiConnexion.ProfilPostService(formData).subscribe(res => {
          message.innerHTML = "Modifications effectuées.";
          console.log(res);
        },
        err => {
          console.log(err);
        });
    }
  }

}
