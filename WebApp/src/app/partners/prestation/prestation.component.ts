import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent implements OnInit {
  saleData = [
    {name: "Janvier", value: "100"},
    {name: "Février", value: "200"},
    {name: "Mars", value: "400"},
    {name: "Avril", value: "300"}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
