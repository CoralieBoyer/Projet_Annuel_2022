import { Component, OnInit } from '@angular/core';
import { ApiConnexionForAdmin } from '../services/api.service';


@Component({
  selector: 'app-analyses',
  templateUrl: './analyses.component.html',
  styleUrls: ['./analyses.component.css']
})
export class AnalysesComponent implements OnInit {
  analyses!: {customers: string, partners: string, produces: string, users: string};

  constructor(private apiConnexionForAdmin: ApiConnexionForAdmin) { }

  ngOnInit(): void {
    this.apiConnexionForAdmin.AnalysesGetService().subscribe(res=>{
        this.analyses = res;
        console.log(res);
      },
      err=>{
        console.log(err);
      });
  }

}
