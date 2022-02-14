import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Zanr } from 'src/app/interfaces/zanr';
import { Film } from 'src/app/interfaces/film';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pretragakorisnik',
  templateUrl: './pretragakorisnik.component.html',
  styleUrls: ['./pretragakorisnik.component.css']
})
export class PretragakorisnikComponent implements OnInit {

  searchTerm1: string;
  searchTerm2: string;
  searchTerm3: string;
  zanrovi: string[] = [];
  knjige: Film[];
  izabrani_filmovi: Film[] = [];
  displayedColumns: string[] = ['slika', 'naziv', 'reziser', 'datum', 'zanr', 'pristupi'];
  

  //poruka: string;
  postoji: boolean = true;   

  constructor(
    private admin:AdminService, 
    private movie: MovieService,
    private ruter: Router
    ) { }

  ngOnInit(): void {
    this.knjige = [];
    this.movie.dohvati_sve_filmove().subscribe((data: Film[]) => {
      this.knjige = data;
      for(let i=0; i<data.length; i++) {
        this.knjige[i].datum = new Date(data[i].datum);
      }
      this.dohvati_zanrove();
    },  err => {
      console.log(err);
    });
  }

  dohvati_zanrove() {
    this.admin.dohvati_zanrove().subscribe((data: Zanr[]) => {
      for(let i=0; i<data.length; i++) {
        this.zanrovi[i] = data[i].naziv;
      }
    },
      err => {
        console.log(err);
      }
    );
  }

  pretraga() {
    this.izabrani_filmovi = [];
   // let i = 0;
    let flag1 = false;
    let flag2 = false;
    let flag3 = false;

    if(this.searchTerm1 != null && this.searchTerm1 != "") {
    //  this.postoji = true;
      flag1 = true;
      let i = 0;
      for(let j=0; j<this.knjige.length; j++) {
        if(this.knjige[j].naziv.toLowerCase().indexOf(this.searchTerm1.toLowerCase()) !== -1) {
          this.izabrani_filmovi[i] = this.knjige[j];
          i++;
        }
      }
      if(this.izabrani_filmovi.length > 0) {
        this.postoji = true;
      } else {
        this.postoji = false;
      }
    }

    if(this.searchTerm2 != null && this.searchTerm2 != "") {
     // this.postoji = true;
      flag2 = true;
      if(!flag1) {
        let k = 0;
        for(let j=0; j<this.knjige.length; j++) {
          for(let m=0; m<this.knjige[j].reziser.length; m++) {
            if(this.knjige[j].reziser[m].toLowerCase().indexOf(this.searchTerm2.toLowerCase()) !== -1) {
              this.izabrani_filmovi[k] = this.knjige[j];
              k++;
            }
          }
        } 
      } else {
        let pom: Film[] = [];
        let l = 0;
        for(let j=0; j<this.izabrani_filmovi.length; j++) {
            for(let m=0; m<this.izabrani_filmovi[j].reziser.length; m++) {
              if(this.izabrani_filmovi[j].reziser[m].toLowerCase().indexOf(this.searchTerm2.toLowerCase()) !== -1) {
                pom[l] = this.izabrani_filmovi[j];
                l++
              }
            }
          }
          this.izabrani_filmovi = pom;
        }
      if(this.izabrani_filmovi.length > 0) {
        this.postoji = true;
      } else {
        this.postoji = false;
      }
    }

    if(this.searchTerm3 != null) {
      flag3 = true;
      if(flag1 || flag2) {
        let pom: Film[] = [];
        let n = 0;
        for(let j=0; j<this.izabrani_filmovi.length; j++) {
          if(this.izabrani_filmovi[j].zanrovi.includes(this.searchTerm3)) {
            pom[n] = this.izabrani_filmovi[j];
            n++;
          }
        }
        this.izabrani_filmovi = pom;
      } else {
        let m = 0;
        for(let j=0; j<this.knjige.length; j++) {
          if(this.knjige[j].zanrovi.includes(this.searchTerm3)) {
            this.izabrani_filmovi[m] = this.knjige[j];
            m++;
          }
        }
      }
      if(this.izabrani_filmovi.length > 0) {
        this.postoji = true;
      } else {
        this.postoji = false;
      }
    }

    if(!flag1 && !flag2 && !flag3) {
      this.postoji = false;
    }

  }

  dodaj(){
    this.ruter.navigate(["/korisnik/dodaj"]);
  }

  pristupi(film: Film) {
    this.ruter.navigate(["/korisnik/film/", film._id]);
  }

}
