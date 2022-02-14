import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegistracijaComponent } from './components/registracija/registracija.component';
import { GostComponent } from './components/gost/gost.component';
import { ModeratorComponent } from './components/moderator/moderator.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { KorisnikComponent } from './components/korisnik/korisnik.component';
import { PrijavaComponent } from './components/prijava/prijava.component';
import { PromenalozinkeComponent } from './components/promenalozinke/promenalozinke.component';
import { KorisnicicekanjeComponent } from './components/korisnicicekanje/korisnicicekanje.component';
import { RegistrovanikorisniciComponent } from './components/registrovanikorisnici/registrovanikorisnici.component';
import { DodajfilmComponent } from './components/dodajfilm/dodajfilm.component';
import { ZanroviComponent } from './components/zanrovi/zanrovi.component';
import { ZaboravljenasifraComponent } from './components/zaboravljenasifra/zaboravljenasifra.component';
import { OdobrifilmComponent } from './components/odobrifilm/odobrifilm.component';
import { PregledfilmaComponent } from './components/pregledfilma/pregledfilma.component';
import { AzurirajfilmComponent } from './components/azurirajfilm/azurirajfilm.component';
import { PretragagostComponent } from './components/pretragagost/pretragagost.component';

import { FilmgostComponent } from './components/filmgost/filmgost.component';
import { MovieFilterPipe } from './components/gost/movie-filter.pipe';
import { InformacijeComponent } from './components/informacije/informacije.component';
import { SpisakkomentaraComponent } from './components/spisakkomentara/spisakkomentara.component';
import { PretragakorisnikComponent } from './components/pretragakorisnik/pretragakorisnik.component';
import { FilmkorisnikComponent } from './components/filmkorisnik/filmkorisnik.component';
import { PotvrdalozinkeComponent } from './components/potvrdalozinke/potvrdalozinke.component';
import { KorisnikposetaComponent } from './components/korisnikposeta/korisnikposeta.component';
import { KorisnikpretragaComponent } from './components/korisnikpretraga/korisnikpretraga.component';
import { DesavanjagostComponent } from './components/desavanjagost/desavanjagost.component';

import { AzurirajkorisnikaComponent } from './components/azurirajkorisnika/azurirajkorisnika.component';

import { ChartsModule } from 'ng2-charts';
import { DesavanjeComponent } from './components/desavanje/desavanje.component';
import { DesavanjeprivatnoComponent } from './components/desavanjeprivatno/desavanjeprivatno.component';
import { DesavanjejavnoComponent } from './components/desavanjejavno/desavanjejavno.component';
import { DesavanjaComponent } from './components/desavanja/desavanja.component';





@NgModule({
  declarations: [
    AppComponent,
    PrijavaComponent,
    RegistracijaComponent,
    GostComponent,
    ModeratorComponent,
    AdministratorComponent,
    KorisnikComponent,
    PromenalozinkeComponent,
    KorisnicicekanjeComponent,
    RegistrovanikorisniciComponent,
    DodajfilmComponent,
    ZanroviComponent,
    ZaboravljenasifraComponent,
    OdobrifilmComponent,
    PregledfilmaComponent,
    AzurirajfilmComponent,
    PretragagostComponent,
    FilmgostComponent,
    MovieFilterPipe,
    InformacijeComponent,
    SpisakkomentaraComponent,
    PretragakorisnikComponent,
    FilmkorisnikComponent,
    PotvrdalozinkeComponent,
    KorisnikposetaComponent,
    KorisnikpretragaComponent,
    DesavanjagostComponent,
    AzurirajkorisnikaComponent,
    DesavanjeComponent,
    DesavanjeprivatnoComponent,
    DesavanjejavnoComponent,
    DesavanjaComponent
     
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    MatPaginatorModule,
    ChartsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
