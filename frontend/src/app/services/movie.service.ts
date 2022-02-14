import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from '../interfaces/film';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  dodaj_film(
    slika: string,
    naziv: string,
    reziser: string,
    datum: Date,
    zanr: any,  //u prvom slucaju se salje kao string a u drugom kao string[]
    opis: string
  ) {
    if(slika == null) {
      const k = {
        slikaPutanja: "assets/generic_movie.jpg",
        naziv: naziv,
        reziser: reziser, 
        datum: datum.toString(),
        zanr: zanr,
        opis: opis
      }
      return this.http.post("http://localhost:3000/movies/dodajfilm2", k);
    }
    else {
      const postData = new FormData();
    postData.append("naziv", naziv);
    postData.append("slika", slika, naziv);
    postData.append("reziser", reziser);
    postData.append("datum", datum.toString());
    postData.append("zanr", zanr);
    postData.append("opis", opis);
    return this.http.post("http://localhost:3000/movies/dodajfilm1", postData);
    }
  }

  dohvati_zahteve() {
    return this.http.get("http://localhost:3000/movies/zahtevi");
  }

  odobri_zahtev(_id: string) {
    return this.http.post("http://localhost:3000/movies/odobri", {_id: _id});
  }

  odbaci_zahtev(_id: string) {
    return this.http.post("http://localhost:3000/movies/odbaci", {_id: _id});
  }

  dohvati_sve_filmove() {
    return this.http.get("http://localhost:3000/movies/svifilmovi");
  }

  dohvati_odobrene_filmove() {
    return this.http.get("http://localhost:3000/movies/sviodobrenifilmovi");
  }

  dohvati_id(_id: string) {
    return this.http.get("http://localhost:3000/movies/" + _id);
  }

  azuriraj_film(film: Film) {
    return this.http.put("http://localhost:3000/movies/azuriraj", film);
  }


}
