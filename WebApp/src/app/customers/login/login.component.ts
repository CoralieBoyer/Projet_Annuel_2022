import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ConnexionService, InscriptionService } from '../services/login.service';
import { ApiConnexion } from "../services/api.service";

import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  inscriptionForm!: FormGroup;
  attributsConnexion!: {name: string, label: string, class: string, type:string, value: string}[];
  attributsInscription!: {name: string, ngif: boolean, label: string, class: string, type: string, value: string}[];

  title = 'angularphp';
  response = "";

  constructor(private formBuilder: FormBuilder, private connexionService: ConnexionService, private inscriptionService: InscriptionService, private apiConnexion: ApiConnexion, private router: Router, private cookie: CookieService) {

  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      name: [],
      password: []
    });
    this.inscriptionForm = this.formBuilder.group({
      newName: [],
      newFirstName: [],
      newSiret: [],
      newAddress: [],
      newCode: [],
      newCity: [],
      newPhoneNumber: [],
      newEmail: [],
      newUsername: [],
      newPassword: [],
      newPasswordConfirm: []
    });

    this.attributsConnexion = this.connexionService.attributs;
    this.attributsInscription = this.inscriptionService.attributs;

  }

  verifLogin(){
    const verify = this.connexionService.verif();

    if(verify == 1)
      this.callApiConnexion();
  }

  callApiConnexion(){
    let message = window.document.getElementById("messageConnexion")!;
    const formData: FormData = new FormData();
    for (let attribut of this.attributsConnexion)
      formData.append(attribut.name, attribut.value);
    this.apiConnexion.ConnexionService(formData).subscribe(res=>{
        console.log(res);
        console.log(res.user)
        if (res.user == "false")
          message.innerHTML = "Identifiants incorrectes.";
        if (res.user == "customer")
          this.router.navigate(['']);
        if (res.user == "partner")
          this.router.navigate(['/partenaire']);
        if (res.user == "admin")
          this.router.navigate(['/admin']);
        this.cookie.set('id', res.id);
        this.cookie.set('user',res.user);
      },
      err=>{
        console.log(err);
      });
  }

  verifInscription(){
    const verify = this.inscriptionService.verif();

    if(verify == 1)
      this.callApiIncription();
  }

  callApiIncription(){
    let message = window.document.getElementById("messageInscription")!;
    const formData: FormData = new FormData();
    for (let attribut of this.attributsInscription)
      formData.append(attribut.name, attribut.value);
    this.apiConnexion.InscriptionService(formData).subscribe(res=>{
        if (res == "false"){
          message.innerHTML = "Ce compte existe déjà.";
        }
        if (res == "partner"){
          alert("Votre compte a été créé avec succès.");
          console.log(res);
        }
        if (res == "customer")
          alert("Votre compte a été créé avec succès.");
      },
      err=>{
        console.log(err);
      });
  }

  nav(parameter: string){
    if (parameter === 'customer')
      this.inscriptionService.navCustomer();
    if (parameter === 'entreprise')
      this.inscriptionService.navEntreprise();
  }

}
