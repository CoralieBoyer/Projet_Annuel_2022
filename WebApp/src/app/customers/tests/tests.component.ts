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

}
