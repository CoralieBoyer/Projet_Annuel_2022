import { Component, OnInit } from '@angular/core';

import { ApiConnexionForAdmin } from '../services/api.service';

@Component({
  selector: 'app-gestion-customers',
  templateUrl: './gestion-customers.component.html',
  styleUrls: ['./gestion-customers.component.css']
})

export class GestionCustomersComponent implements OnInit {
  attributsUser!: {address: string, city: string, email:string, firstname: string, id: string, id_user: string, name: string, password:string, pay: string, phone_number: string,  username: string, zip_code: string}[];
  headerTab = [ "ID", "Nom", "Prénom", "Email","Actions"];

  constructor(private apiConnexionForAdmin: ApiConnexionForAdmin) {
  }

  ngOnInit(): void {
    this.apiConnexionForAdmin.GestionUsersGetService().subscribe(res=>{
        this.attributsUser = res;
        console.log(res);
      },
      err=>{
        console.log(err);
      });
  }

}
