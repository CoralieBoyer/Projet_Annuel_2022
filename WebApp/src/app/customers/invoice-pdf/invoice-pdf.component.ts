import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ApiConnexion} from "../services/api.service";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-root',
  templateUrl: './invoice-pdf.component.html',
  styleUrls: ['./invoice-pdf.component.css']
})
export class InvoicePdfComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  attributsUser!: {id: string, name: string, email: string, password: string};
  attributsCustomer!: {id: string, firstname: string, address: string, city: string, phone_number: string, zip_code: string};
  attributsBasket!: {id: string, data: string, count: string, name: string, price: string}[][];
  idBaskets!: {id: string, date: string}[];
  id = this.cookie.get('id');
  idBasket = '';
  date = '';
  total = 0;

  constructor(private apiConnexion: ApiConnexion, private cookie: CookieService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idBasket = this.route.snapshot.params['idBasket'];
    const formData: FormData = new FormData();
    formData.append("action", "get");
    formData.append("id", this.id);
    this.apiConnexion.ProfilPostService(formData).subscribe(res=>{
        this.attributsUser = res.user;
        this.attributsCustomer = res.customer;
        this.attributsBasket = res.baskets;
        this.idBaskets = res.idBaskets;
        for (let i = 0; i < this.idBaskets.length; i++)
          if (this.idBaskets[i].id == this.idBasket)
            this.date = this.idBaskets[i].date;
        for (let j = 0; j < this.attributsBasket[parseInt(this.idBasket)].length; j++)
          this.total += parseInt(this.attributsBasket[parseInt(this.idBasket)][j].price)*parseInt(this.attributsBasket[parseInt(this.idBasket)][j].count);
      },
      err=>{
        console.log(err);
      });
  }

  public createPDF(): void {
    let DATA: any = document.getElementById(this.idBasket);
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('FactureLoyaltyCard-N°'+this.idBasket+'.pdf');
    });
  }
}
