import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AnalysesComponent } from './admins/analyses/analyses.component';
import { CustomersComponent } from './admins/customers/customers.component';
import { DashboardComponent } from './admins/dashboard/dashboard.component';
import { GestionAdminsComponent } from './admins/gestion-admins/gestion-admins.component';
import { GestionPartnersComponent } from './admins/gestion-partners/gestion-partners.component';
import { GestionCustomersComponent } from './admins/gestion-customers/gestion-customers.component';
import { PartnersComponent } from './admins/partners/partners.component';
import { ProfilAdminComponent } from './admins/profil-admin/profil-admin.component';
import { CatalogObjectsComponent } from './customers/catalog-objects/catalog-objects.component';
import { CatalogPrestationsComponent } from './customers/catalog-prestations/catalog-prestations.component';
import { HeaderComponent } from './customers/header/header.component';
import { HomePageComponent } from './customers/home-page/home-page.component';
import { LoginComponent } from './customers/login/login.component';
import { ProductComponent } from './customers/product/product.component';
import { ProfileComponent } from './customers/profile/profile.component';
import { ShoppingCartComponent } from './customers/shopping-cart/shopping-cart.component';
import { TestsComponent } from './customers/tests/tests.component';
import { ContactComponent } from './partners/contact/contact.component';
import { ContributionComponent } from './partners/contribution/contribution.component';
import { FaqComponent } from './partners/faq/faq.component';
import { StatistiquesComponent } from './partners/statistiques/statistiques.component';
import { PrestationsComponent } from './partners/prestations/prestations.component';
import { SideBarComponent } from './partners/side-bar/side-bar.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConnexionService, InscriptionService} from "./customers/services/login.service";
import {CookieService} from "ngx-cookie-service";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {PaymentPageComponent} from "./customers/payment-page/payment-page.component";
import { OneSignal } from 'onesignal-ngx';
import { InvoicePdfComponent } from './customers/invoice-pdf/invoice-pdf.component';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { GestionProductsComponent } from './admins/gestion-products/gestion-products.component';
import { ProfilPartnerComponent } from './partners/profil-partner/profil-partner.component';

const appRoutes: Routes = [
  { path : '', component: HomePageComponent },
  { path: 'admin', component: DashboardComponent },
  { path: 'admin/partner/:id', component: PartnersComponent},
  { path: 'admin/customer/:id', component: CustomersComponent},
  { path: 'partenaire', component: StatistiquesComponent},
  { path: 'partenaire/cotisations', component: ContributionComponent},
  { path: 'partenaire/contact', component: ContactComponent},
  { path: 'partenaire/contact/FAQ', component: FaqComponent},
  { path: 'partenaire/prestations', component: PrestationsComponent},
  { path: 'partners/profil', component: ProfilPartnerComponent},
  { path: 'connexion', component: LoginComponent },
  { path: 'produit/:id', component: ProductComponent },
  { path: 'prestations', component: CatalogPrestationsComponent },
  { path: 'objets', component: CatalogObjectsComponent },
  { path: 'profil', component: ProfileComponent },
  { path: 'panier', component: ShoppingCartComponent },
  { path: 'tests', component: TestsComponent },
  { path: 'payment', component: PaymentPageComponent },
  { path: 'invoice/:idBasket', component: InvoicePdfComponent },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
    AppComponent,
    AnalysesComponent,
    CustomersComponent,
    DashboardComponent,
    GestionAdminsComponent,
    GestionPartnersComponent,
    GestionCustomersComponent,
    PartnersComponent,
    ProfilAdminComponent,
    CatalogObjectsComponent,
    CatalogPrestationsComponent,
    HeaderComponent,
    HomePageComponent,
    LoginComponent,
    ProductComponent,
    ProfileComponent,
    ShoppingCartComponent,
    TestsComponent,
    ContactComponent,
    ContributionComponent,
    FaqComponent,
    StatistiquesComponent,
    PrestationsComponent,
    SideBarComponent,
    InvoicePdfComponent,
    GestionProductsComponent,
    ProfilPartnerComponent,
    PaymentPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxBarcode6Module
  ],
  providers: [
    ConnexionService,
    InscriptionService,
    GestionPartnersComponent,
    CookieService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
