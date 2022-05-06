import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiConnexion {

  constructor(private http:HttpClient) { }

  link = "http://localhost";

  port = ":8888";

  pathLink = "/API/customers/";

  ConnexionService(fromData: FormData):Observable<any>{
    return this.http.post<any>(this.link + this.port + this.pathLink + 'connexion', fromData);
  }

  InscriptionService(fromData: FormData):Observable<any>{
    return this.http.post<any>(this.link + this.port + this.pathLink + 'inscription', fromData);
  }

  HomeCustomerGetService():Observable<any>{
    return this.http.get(this.link + this.port + this.pathLink + 'accueil');
  }

  HomeCustomerPostService(fromData: FormData):Observable<any>{
    return this.http.post<any>(this.link + this.port + this.pathLink + 'accueil', fromData);
  }

  ProducePostService(fromData: FormData):Observable<any>{
    return this.http.post<any>(this.link + this.port + this.pathLink + 'product', fromData);
  }

  ProfilPostService(fromData: FormData):Observable<any>{
    return this.http.post<any>(this.link + this.port + this.pathLink + 'profile', fromData);
  }

  ShoppingCartPostService(fromData: FormData):Observable<any>{
    return this.http.post<any>(this.link + this.port + this.pathLink + 'shopping_cart', fromData);
  }

  TestsGetService():Observable<any>{
    return this.http.get(this.link + this.port + this.pathLink + 'tests');
  }

}
