export class ConnexionService {
  classInput = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  attributs = [
    {
      name: "name",
      label: "Email",
      class: this.classInput,
      type: 'email',
      value: ''
    },
    {
      name: "password",
      label: "Mot de passe",
      class: this.classInput,
      type: 'password',
      value: ''
    }
    ];

  verif(){
    const message = window.document.getElementById("messageConnexion")!;
    message.innerHTML = '';

    for (let attribut of this.attributs){
      attribut.class = this.classInput;
      if (attribut.value.length < 1) {
        console.log(attribut.value);
        message.innerHTML = 'Remplir tous les champs.';
        attribut.class += " border-red-500";
      }
    }
    if(message.innerHTML === ''){
      return 1;
    }else{
      return 0;
    }
  }
}

export class InscriptionService{
  classInput = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  customer = true;
  entreprise = false;

  attributs = [
    {//0
      name: "newName",
      ngif: true,
      label: "Nom",
      class: this.classInput,
      type: "text",
      value: ""
    },
    {//1
      name: "newSiret",
      ngif: this.entreprise,
      label: "Numéro SIRET",
      class: this.classInput,
      type: "number",
      value: ""
    },
    {//2
      name: "newFirstName",
      ngif: this.customer,
      label: "Prénom",
      class: this.classInput,
      type: "text",
      value: ""
    },
    {//3
      name: "newAddress",
      ngif: this.customer,
      label: "Adresse",
      class: this.classInput,
      type: "text",
      value: ""
    },
    {//4
      name: "newCode",
      ngif: this.customer,
      label: "Code postal",
      class: this.classInput,
      type: "number",
      value: ""
    },
    {//5
      name: "newCity",
      ngif: this.customer,
      label: "Ville",
      class: this.classInput,
      type: "text",
      value: ""
    },
    {//6
      name: "newPhoneNumber",
      ngif: this.customer,
      label: "Téléphone",
      class: this.classInput,
      type: "number",
      value: ""
    },
    {//7
      name: "newEmail",
      ngif: true,
      label: "E-mail",
      class: this.classInput,
      type: "email",
      value: ""
    },
    {//8
      name: "newPassword",
      ngif: true,
      label: "Mot de passe",
      class: this.classInput,
      type: "password",
      value: ""
    },
    {//9
      name: "newPasswordConfirm",
      ngif: true,
      label: "Confirmer le mot de passe",
      class: this.classInput,
      type: "password",
      value: ""
    }
  ];

  navCustomer(){
    let buttonClient = window.document.getElementById("buttonNavClient");
    let buttonEntreprise = window.document.getElementById("buttonNavEntreprise");
    let message = window.document.getElementById("messageInscription")!;

    buttonClient!.className = "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-800 font-semibold";
    buttonEntreprise!.className = "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-700 font-semibold";
    message.innerHTML = '';

    this.customer = true;
    this.entreprise = false;

    for (let attribut of this.attributs) {
      attribut.class = this.classInput;
      attribut.value = "";
    }
    this.attributs[1].ngif = this.entreprise;
    for (let i=2; i<=6; ++i)
      this.attributs[i].ngif = this.customer;
  }

  navEntreprise(){
    let buttonClient = window.document.getElementById("buttonNavClient");
    let buttonEntreprise = window.document.getElementById("buttonNavEntreprise");
    let message = window.document.getElementById("messageInscription")!;

    buttonClient!.className = "bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-700 font-semibold";
    buttonEntreprise!.className= "bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-800 font-semibold";
    message.innerHTML = '';

    this.customer = false;
    this.entreprise = true;

    for (let attribut of this.attributs) {
      attribut.class = this.classInput;
      attribut.value = "";
    }
      this.attributs[1].ngif = this.entreprise;
    for (let i=2; i<=6; ++i)
      this.attributs[i].ngif = this.customer;
  }

  verif(){
    let message = window.document.getElementById("messageInscription")!;
    message.innerHTML = '';

    if (this.attributs[1].value.length != 14 && this.attributs[1].ngif){
      message.innerHTML = 'Mauvais format.';
      this.attributs[1].class += " border-red-500";
    }
    if (this.attributs[4].ngif)
      if (this.attributs[4].value.length != 5 || this.attributs[4].value < "0" || this.attributs[4].value > "96" && this.attributs[4].value < "97" || this.attributs[4].value > "98") {
        message.innerHTML = 'Mauvais format.';
        this.attributs[4].class += " border-red-500";
      }
    if (this.attributs[6].value.length > 10 && this.attributs[6].ngif){
      message.innerHTML = 'Mauvais format.';
      this.attributs[6].class += " border-red-500";
    }
    if (this.attributs[8].value != this.attributs[9].value){
      message.innerHTML = 'Le mot de passe est différent.';
      this.attributs[8].class += " border-red-500";
      this.attributs[9].class += " border-red-500";
    }
    for (let attribut of this.attributs){
      attribut.class = this.classInput;
      if (attribut.value.length < 1 && attribut.ngif) {
        message.innerHTML = 'Remplir tous les champs.';
        attribut.class += " border-red-500";
      }
    }

    if(message.innerHTML === ''){
      return 1;
    }else{
      return 0;
    }
  }

}
