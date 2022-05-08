import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiConnexionForPartner {

  constructor(private http: HttpClient) {
  }

  link = "http://localhost";

  port = ":8888";

  pathLink = "/API/partners/";

  StatistiquesPostService(fromData: FormData): Observable<any> {
    return this.http.post<any>(this.link + this.port + this.pathLink + 'statistiques', fromData);
  }

  PrestationsPostService(fromData: FormData): Observable<any> {
    return this.http.post<any>(this.link + this.port + this.pathLink + 'prestations', fromData);
  }

  ContributionPostService(fromData: FormData): Observable<any> {
    return this.http.post<any>(this.link + this.port + this.pathLink + 'contributions', fromData);
  }

  ProfilePostService(fromData: FormData): Observable<any> {
    return this.http.post<any>(this.link + this.port + this.pathLink + 'profile', fromData);
  }

}
