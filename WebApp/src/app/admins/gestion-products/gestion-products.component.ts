import { Component, OnInit } from '@angular/core';
import {ApiConnexionForAdmin} from "../services/api.service";

@Component({
  selector: 'app-gestion-products',
  templateUrl: './gestion-products.component.html',
  styleUrls: ['./gestion-products.component.css']
})
export class GestionProductsComponent implements OnInit {
  attributsProducts!: {id: string, name: string, image: string, description: string, price: string, quantity: string}[];
  headerTab = ["ID", "Nom", "Image", "Description", "Prix", "Quantité"];

  constructor(private apiConnexionForAdmin: ApiConnexionForAdmin) { }

  ngOnInit(): void {
    this.apiConnexionForAdmin.GestionProductsGetService().subscribe(res=>{
        this.attributsProducts = res;
        console.log(res);
      },
      err=>{
        console.log(err);
      });
  }

  add(){
    const formData: FormData = new FormData();
    formData.append("action", "add");
    this.apiConnexionForAdmin.GestionProductsPostService(formData).subscribe(res=>{
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
    this.apiConnexionForAdmin.GestionProductsPostService(formData).subscribe(res=>{
        alert(res);
        this.ngOnInit();
      },
      err=>{
        console.log(err);
      });
  }

}
