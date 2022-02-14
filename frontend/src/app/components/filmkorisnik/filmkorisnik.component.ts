import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/film';
import { FilmIzListe } from 'src/app/interfaces/filmizliste';
import { MovieService } from 'src/app/services/movie.service';
import { Komentar } from 'src/app/interfaces/komentar';
import { Router, ActivatedRoute } from '@angular/router';
import { RegkorService } from 'src/app/services/regkor.service';
import { NgForm } from '@angular/forms';
import { StringifyOptions } from 'querystring';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-filmkorisnik',
  templateUrl: './filmkorisnik.component.html',
  styleUrls: ['./filmkorisnik.component.css']
})
export class FilmkorisnikComponent implements OnInit {

  id: string;
  film: Film = {} as Film;
  komentari: Komentar[] = [];
  stanje: string;  
  korime: string;

  status: string;
  poruka: string;

  vidljiv: boolean;
  promeni: boolean;
  uneo: boolean;

  rating: number;
  ratingArr = new Array(10);
  tekst: string;
 // ocena: number;
  

  constructor(
    private movie: MovieService,
    private ruter: Router,
    private route: ActivatedRoute,
    private regkor: RegkorService,
    private snackbar: MatSnackBar
   
  ) { }

  ngOnInit(): void {
    this.vidljiv = false;
    this.promeni = false;
    this.korime = localStorage.getItem("korime");
    this.id = this.route.snapshot.paramMap.get('id');
    this.regkor.dohvati_film_i_komentare(this.id).subscribe((data: any) => {
       data.movie.datum = new Date(data.movie.datum);
       this.film = data.movie;
       this.komentari = data.comments;
       //console.log(data);
       //console.log(this.komentari);
       this.komentari.forEach(komentar => {
         if(komentar.korime == this.korime) {
           this.uneo = true;
           this.tekst = komentar.tekst;
           this.rating = komentar.ocena;
         }
       });
       this.film_info();
     }, err => {
       console.log(err);
     }  
     );
  }

  film_info() {
    this.regkor.film_info(this.korime, this.film.naziv, this.film.reziser).subscribe((data: any) => {
      if(!data.flag) {
        this.status = data.status;
        console.log(data.message);
      } else {
        this.status =  data.status;
      }
    }, err => {
      console.log(err);
    }  
    );
  }

  povratak() {
    this.ruter.navigate(["/korisnik/pretraga"]);
  } 

  pogledao() {
    this.regkor.pogledao(this.korime, this.film.naziv, this.film.reziser).subscribe((response: any) => {
      console.log(response.message);
      this.status = response.status;
    }, err => {
      console.log(err);
    });

  }

  stavi() {
    this.regkor.stavi(this.korime, this.film.naziv, this.film.reziser).subscribe((response: any) => {
      console.log(response.message);
      this.status = response.status;
    }, err => {
      console.log(err);
    });
  }

  ukloni() {
    this.regkor.ukloni(this.korime, this.film.naziv, this.film.reziser).subscribe((response: any) => {
      console.log(response.message);
      this.status = "ne_postoji"
    }, err => {
      console.log(err);
    });
  }

  zapocni() {
    this.regkor.zapocni(this.korime, this.film.naziv, this.film.reziser).subscribe((response: any) => {
     this.status = response.status;
    }, err => {
      console.log(err);
    });
  }


  unesite_komentar() {
    this.vidljiv = true;
  }

  unesi(form: NgForm) {
    if(form.invalid || this.rating   == null) {
      //alert("Ne moze");
      this.vidljiv = false;
      return;
    }
    if(!this.tekst) {
      this.tekst = "";
    }
    const k = {
      korime: this.korime,
      reziser: this.film.reziser,
      naziv: this.film.naziv,
      ocena: this.rating,
      tekst: this.tekst
    }
    this.regkor.unesi_komentar(k).subscribe((response: any) => {
      console.log(response.message);
      this.komentari.push(response.comment);
      this.uneo = true;
      this.vidljiv = false;
      this.film.prosek = response.prosek;
    }, err => {
      console.log(err);
    });
  }

  onClick(rating:number) {
   // console.log(rating);
    this.rating = rating;
  }
  
  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
       return 'star_border';
    }
  }

  promeni_svoj_komentar() {
    this.promeni = true;
  }

  promenikom(form: NgForm) {
    if(form.invalid) {
      this.promeni = false;
      return;
    }
    const k = {
      korime: this.korime,
      reziser: this.film.reziser,
      naziv: this.film.naziv,
      ocena: this.rating,
      tekst: this.tekst
    }
    this.regkor.promeni_svoj_komentar(k).subscribe((response: any) => {
      console.log(response.message);
      this.komentari.forEach((kom, index) => {
        if(kom.korime == this.korime) {
          this.komentari[index].tekst = this.tekst;
          this.komentari[index].ocena = this.rating;
        } 
      });
      this.promeni = false;
      this.film.prosek = response.prosek;
    }, err => {
      console.log(err);
    });
  }

  korisnik(komentar: Komentar) {
    this.ruter.navigate([`korisnik/poseta/${komentar.korime}`]);
  }

  openSnackBar() {
    this.snackbar.open("Ne mozete uneti komentar!", '', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }

}
