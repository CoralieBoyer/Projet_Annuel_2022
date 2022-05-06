import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  liste = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(i: number) {
    this.liste = i;
  }

}
