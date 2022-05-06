import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { ApiConnexionForAdmin } from '../services/api.service';

@Component({
  selector: 'app-gestion-partners',
  templateUrl: './gestion-partners.component.html',
  styleUrls: ['./gestion-partners.component.css']
})

export class GestionPartnersComponent implements OnInit {
  attributsPartner!: {email: string, id: string, id_user: string, name: string, password:string, siret: string, start_partnership: string, status: string}[];
  headerTab = ["ID", "Nom", "SIRET", "Actions"];

  constructor(private apiConnexionForAdmin: ApiConnexionForAdmin) {
  }

  ngOnInit(): void {
    this.apiConnexionForAdmin.GestionPartnersGetService().subscribe(res=>{
        this.attributsPartner = res;
        console.log(res);
      },
      err=>{
        console.log(err);
      });
  }

}
