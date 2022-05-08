import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiConnexionForAdmin } from '../services/api.service';
import { GestionPartnersComponent } from '../gestion-partners/gestion-partners.component';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  attributsPartner!: {email: string, id: string, id_user: string, name: string, password:string, siret: string, start_partnership: string, status: string};
  headerTabInfos = [ "ID", "Nom", "SIRET", "Statut", "Email", "Actions"];
  headerTabContribution = [ "Année", "Prix"];
  attributsContributions = [
    {"Year" : 2020, "Price": "300€"},
    {"Year" : 2021, "Price": "500€"}
  ];
  headerTabProduces = ["ID", "Name", "Description", "Image", "Prix (€)", "Quantité", "Actions"];
  attributsProduces!: {description: string, id_product: string, id_partner: string, image: string, name: string, price: string, quantity: string}[];
  title = 'Test-graph';
  saleData!: { name: string, value: number }[];

  constructor(private apiConnexionForAdmin: ApiConnexionForAdmin, private route: ActivatedRoute, private gestionPartners: GestionPartnersComponent) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const formData: FormData = new FormData();
    formData.append("action", "getInfos");
    formData.append("id", id);
    this.apiConnexionForAdmin.GestionPartnersPostService(formData).subscribe(res=>{
        this.attributsPartner = res.infos;
        this.attributsProduces = res.produces;
        this.saleData = res.cautisations;
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
    this.apiConnexionForAdmin.GestionPartnersPostService(formData).subscribe(res=>{
        message.innerHTML = res;
        this.ngOnInit();
      },
      err=>{
        console.log(err);
      });
  }

  modify(){
    let message = window.document.getElementById("message")!;
    const formData: FormData = new FormData();
    formData.append("action", "modify");
    formData.append("id_user", this.attributsPartner.id_user);
    formData.append("name", this.attributsPartner.name);
    formData.append("email", this.attributsPartner.email);
    formData.append("password", this.attributsPartner.password);
    formData.append("siret", this.attributsPartner.siret);
    formData.append("status", this.attributsPartner.status);
    formData.append("id", this.attributsPartner.id);
    this.apiConnexionForAdmin.GestionPartnersPostService(formData).subscribe(res=>{
        message.innerHTML = res;
        this.ngOnInit();
      },
      err=>{
        console.log(err);
      });
  }

  deleteProduce(id: string){
    let message = window.document.getElementById("message")!;
    const formData: FormData = new FormData();
    formData.append("action", "deleteProduct");
    formData.append("id", id);
    this.apiConnexionForAdmin.GestionPartnersPostService(formData).subscribe(res=>{
        message.innerHTML = res;
        this.ngOnInit();
      },
      err=>{
        console.log(err);
      });
  }

  modifyProduce(description: string, id: string, image: string, name: string, points: string, quantity: string){
    let message = window.document.getElementById("message")!;
    const formData: FormData = new FormData();
    formData.append("action", "modifyProduce");
    formData.append("description", description);
    formData.append("id", id);
    formData.append("image", image);
    formData.append("name", name);
    formData.append("points", points);
    formData.append("quantity", quantity);
    this.apiConnexionForAdmin.GestionPartnersPostService(formData).subscribe(res=>{
        message.innerHTML = res;
        this.ngOnInit();
      },
      err=>{
        console.log(err);
      });
  }

}
