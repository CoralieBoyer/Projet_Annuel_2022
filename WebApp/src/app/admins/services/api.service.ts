import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiConnexionForAdmin {

  constructor(private http:HttpClient) { }

  link = "http://localhost";

  port = ":8888";

  pathLink = "/API/admins/";

  GestionUsersGetService():Observable<any>{
    return this.http.get(this.link + this.port + this.pathLink + 'customers');
  }
  GestionUsersPostService(fromData: FormData):Observable<any>{
    return this.http.post<any>(this.link + this.port + this.pathLink + 'customers', fromData);
  }

  GestionPartnersGetService():Observable<any>{
    return this.http.get(this.link + this.port + this.pathLink + 'partners');
  }
  GestionPartnersPostService(fromData: FormData):Observable<any>{
    return this.http.post<any>(this.link + this.port + this.pathLink + 'partners', fromData);
  }

  GestionAdminsGetService():Observable<any>{
    return this.http.get(this.link + this.port + this.pathLink + 'admins');
  }
  GestionAdminsPostService(fromData: FormData):Observable<any>{
    return this.http.post<any>(this.link + this.port + this.pathLink + 'admins', fromData);
  }

  AnalysesGetService():Observable<any>{
    return this.http.get(this.link + this.port + this.pathLink + 'analyses');
  }

  ProfilPostService(fromData: FormData):Observable<any>{
    return this.http.post<any>(this.link + this.port + this.pathLink + 'profile', fromData);
  }
}
