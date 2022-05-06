import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiConnexionForAdmin } from '../services/api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  attributsCustomer!: {address: string, city: string, email:string, firstname: string, id: string, id_user: string, name: string, password:string, pay: string, phone_number: string,  username: string, zip_code: string};
  headerTabInfos = [ "ID", "Nom", "Prénom", "Email","Téléphone", "Actions"];
  headerTabAddress = ["N° rue", "Ville", "Code postale"];
  attributsBasket!: {id: string, data_validation: string, count: string, name: string, points: string}[][];
  idBaskets!: {id: string, date_validation: string}[];
  headerTabBasket = ["ID", "Date", "Produits"];

  constructor(private apiConnexionForAdmin: ApiConnexionForAdmin, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const formData: FormData = new FormData();
    formData.append("action", "getInfos");
    formData.append("id", id);
    this.apiConnexionForAdmin.GestionUsersPostService(formData).subscribe(res=>{
        this.attributsCustomer = res.infos;
        this.attributsBasket = res.baskets;
        this.idBaskets = res.idBaskets;
        console.log(res);
      },
      err=>{
        console.log(err);
      });
  }

  delete(id_user: string, id: string){
    let message = window.document.getElementById("message")!;
    const formData: FormData = new FormData();
    formData.append("action", "delete");
    formData.append("id_user", id_user);
    formData.append("id", id);
    this.apiConnexionForAdmin.GestionUsersPostService(formData).subscribe(res=>{
        message.innerHTML = res;
      },
      err=>{
        console.log(err);
      });
  }

  modify(id_user: string, name : string, password : string, firstname: string, email: string, phone_number: string, id: string){
    let message = window.document.getElementById("message")!;
    const formData: FormData = new FormData();
    formData.append("action", "modify");
    formData.append("id_user", id_user);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("firstname", firstname);
    formData.append("email", email);
    formData.append("phone_number", phone_number);
    formData.append("id", id);
    this.apiConnexionForAdmin.GestionUsersPostService(formData).subscribe(res=>{
        message.innerHTML = res;
      },
      err=>{
        console.log(err);
      });
  }

}
