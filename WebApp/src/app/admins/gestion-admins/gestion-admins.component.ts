import { Component, OnInit } from '@angular/core';
import { ApiConnexionForAdmin } from '../services/api.service';

@Component({
  selector: 'app-gestion-admins',
  templateUrl: './gestion-admins.component.html',
  styleUrls: ['./gestion-admins.component.css']
})
export class GestionAdminsComponent implements OnInit {
  attributsAdmin!: {email: string, firstname: string, id: string, id_user: string, label_role: string, name: string, password:string}[];
  NewAttributsAdmin = {email: "", firstname: "", name: "", password:""};
  headerTab = [ "ID", "Nom", "Prénom", "Email", "Mot de passe", "Actions", "Message"];

  constructor(private apiConnexionForAdmin: ApiConnexionForAdmin) {
  }

  ngOnInit(): void {
    this.apiConnexionForAdmin.GestionAdminsGetService().subscribe(res=>{
        this.attributsAdmin = res;
        console.log(res);
      },
      err=>{
        console.log(err);
      });
  }

  add(){
    let message = window.document.getElementById("add")!;
    const formData: FormData = new FormData();
    formData.append("action", "add");
    formData.append("name", this.NewAttributsAdmin.name);
    formData.append("firstname", this.NewAttributsAdmin.firstname);
    formData.append("email", this.NewAttributsAdmin.email);
    formData.append("password", this.NewAttributsAdmin.password);
    this.apiConnexionForAdmin.GestionAdminsPostService(formData).subscribe(res=>{
        message.innerHTML = res;
      },
      err=>{
        console.log(err);
      });
  }

  delete(id_user: string, id: string){
    let message = window.document.getElementById(id_user)!;
    const formData: FormData = new FormData();
    formData.append("action", "delete");
    formData.append("id_user", id_user);
    formData.append("id", id);
    this.apiConnexionForAdmin.GestionAdminsPostService(formData).subscribe(res=>{
        message.innerHTML = res;
      },
      err=>{
        console.log(err);
      });
  }

  modify(id_user: string, name : string, password : string, firstname: string, email: string, id: string){
    let message = window.document.getElementById(id_user)!;
    const formData: FormData = new FormData();
    formData.append("action", "modify");
    formData.append("id_user", id_user);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("firstname", firstname);
    formData.append("email", email);
    formData.append("id", id);
    this.apiConnexionForAdmin.GestionUsersPostService(formData).subscribe(res=>{
        message.innerHTML = res;
      },
      err=>{
        console.log(err);
      });
  }
}
