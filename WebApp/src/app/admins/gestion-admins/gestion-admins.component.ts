import { Component, OnInit } from '@angular/core';
import { ApiConnexionForAdmin } from '../services/api.service';

@Component({
  selector: 'app-gestion-admins',
  templateUrl: './gestion-admins.component.html',
  styleUrls: ['./gestion-admins.component.css']
})
export class GestionAdminsComponent implements OnInit {
  attributsAdmin!: {email: string, firstname: string, id: string, id_user: string, label_role: string, name: string, newPassword:string}[];
  NewAttributsAdmin = {email: "", firstname: "", name: "", password:""};
  headerTab = [ "ID", "Nom", "Prénom", "Email", "Mot de passe", "Actions"];

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
    const formData: FormData = new FormData();
    formData.append("action", "add");
    formData.append("name", this.NewAttributsAdmin.name);
    formData.append("firstname", this.NewAttributsAdmin.firstname);
    formData.append("email", this.NewAttributsAdmin.email);
    this.apiConnexionForAdmin.GestionAdminsPostService(formData).subscribe(res=>{
        alert(res);
        this.ngOnInit();
      },
      err=>{
        console.log(err);
      });
  }

  delete(id_user: string, id: string){
    const formData: FormData = new FormData();
    formData.append("action", "delete");
    formData.append("id_user", id_user);
    formData.append("id", id);
    this.apiConnexionForAdmin.GestionAdminsPostService(formData).subscribe(res=>{
        alert(res);
        this.ngOnInit();
      },
      err=>{
        console.log(err);
      });
  }

  modify(id_user: string, name : string, newpassword: string, firstname: string, email: string, id: string){
    const formData: FormData = new FormData();
    formData.append("action", "modify");
    formData.append("id_user", id_user);
    formData.append("name", name);
    formData.append("firstname", firstname);
    formData.append("email", email);
    formData.append("id", id);
    this.apiConnexionForAdmin.GestionAdminsPostService(formData).subscribe(res=>{
        alert(res);
        this.ngOnInit();
      },
      err=>{
        console.log(err);
      });
    if(newpassword != ""){
      const formData: FormData = new FormData();
      formData.append("action", "modifyPassword");
      formData.append("id_user", id_user);
      formData.append("newPassword", newpassword);
      this.apiConnexionForAdmin.GestionAdminsPostService(formData).subscribe(res=>{
          this.ngOnInit();
        },
        err=>{
          console.log(err);
        });
    }
  }

}
