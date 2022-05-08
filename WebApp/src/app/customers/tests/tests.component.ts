import { Component, OnInit } from '@angular/core';
import {ApiConnexion} from "../services/api.service";

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
  customers!: {firstname: string, name: string, id: string}[];
  partners!: {name: string, id: string}[];
  price!: number;

  constructor(private apiConnexion: ApiConnexion) { }

  ngOnInit(): void {
    this.apiConnexion.TestsGetService().subscribe(res=>{
        console.log(res);
        this.customers = res.customers;
        this.partners = res.partners;
      },
      err=>{
        console.log(err);
      });
  }

  addPoints() {
    let message = window.document.getElementById("message")!;
    const customerSelect = (document.getElementById("customers")) as HTMLSelectElement;
    const customerIndex = customerSelect.selectedIndex;
    const customer = customerSelect.options[customerIndex];
    const partnerSelect = (document.getElementById("partners")) as HTMLSelectElement;
    const partnerIndex = partnerSelect.selectedIndex;
    const partner = partnerSelect.options[partnerIndex];
    if (customer.value == "Selectionner un client") {
      message.innerHTML = "Veuillez sélectionner un client.";
      message.className = "pl-5 text-red-500";
    }else
      if (partner.value == "Selectionner un partenaire") {
        message.innerHTML = "Veuillez sélectionner un partenaire.";
        message.className = "pl-5 text-red-500";
      }else
      if (this.price > 0) {
        const formData: FormData = new FormData();
        formData.append("action", "modifyInfos");
        formData.append("id", customer.value);
        formData.append("price", this.price.toString());
        this.apiConnexion.TestsPostService(formData).subscribe(res => {
            message.innerHTML = res + " points ont été ajouté à "+customer.innerHTML+".";
            message.className = "pl-5 text-green-800";
          },
          err => {
            console.log(err);
          });
      } else {
        message.className = "pl-5 text-red-500";
        message.innerHTML = "Veuillez entrer un prix valide.";
      }
    }

}
