import { Component, OnInit } from '@angular/core';
import {ApiConnexionForAdmin} from "../services/api.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.css']
})
export class ProfilAdminComponent implements OnInit {

  attributsUser!: {id: string, name: string, email: string, password: string};
  attributsAdmin!: {id: string, firstname: string};
  password = {new: "", old: ""};
  id = this.cookie.get('id');

  constructor(private apiConnexionForAdmin: ApiConnexionForAdmin, private cookie: CookieService) { }

  ngOnInit(): void {
    console.log(this.id);
    const formData: FormData = new FormData();
    formData.append("action", "get");
    formData.append("id", this.id);
    this.apiConnexionForAdmin.ProfilPostService(formData).subscribe(res=>{
        this.attributsUser = res.user;
        this.attributsAdmin = res.admin;
        console.log(res);
      },
      err=>{
        console.log(err);
      });
  }

  modifyPassword(){
    let message = window.document.getElementById("message")!;
    console.log(this.password.old);
    console.log(this.password.new);
    if (this.password.old == "" || this.password.new == "")
      message.innerHTML = "Remplir tous les champs";
    else {
      const formData: FormData = new FormData();
      formData.append("action", "modify");
      formData.append("id", this.id);
      formData.append("name", this.attributsUser.name);
      formData.append("email", this.attributsUser.email);
      formData.append("old", this.password.old);
      formData.append("new", this.password.new);
      this.apiConnexionForAdmin.ProfilPostService(formData).subscribe(res => {
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

}
