import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegkorService {

  constructor(private http: HttpClient) { }

  korisnik_po_id(id: string) {
    return this.http.get("http://localhost:3000/users/" + id);
  }

  film_info(korime: string, naziv: string, reziser: string) {

   return this.http.get("http://localhost:3000/movies/info/" + korime + "/" + naziv + "/" + reziser);
  }

  stavi(korime: string, naziv: string, reziser: string) {
    const data = {
      korime: korime,
      naziv: naziv,
      reziser: reziser
    }
    return this.http.post("http://localhost:3000/movies/stavi", data);
  }

  zapocni(korime: string, naziv: string, reziser: string) {
    const data = {
      korime: korime,
      naziv: naziv,
      reziser: reziser
    }
    return this.http.post("http://localhost:3000/movies/zapocni", data);
  }

  ukloni(korime: string, naziv: string, reziser: string) {
    return this.http.delete("http://localhost:3000/movies/ukloni/" + korime + "/" + naziv + "/" + reziser);
  }

  pogledao(korime: string, naziv: string, reziser: string) {
    const data = {
      korime: korime,
      naziv: naziv,
      reziser: reziser
    }
    return this.http.post("http://localhost:3000/movies/pogledao", data);
  }


  unesi_komentar(k: any) {
    return this.http.post("http://localhost:3000/movies/unesikom", k);
  }

  dohvati_film_i_komentare(id: string) {
    return this.http.get("http://localhost:3000/movies/filmkom/" + id);
  }

  promeni_svoj_komentar(k: any) {
    return this.http.post("http://localhost:3000/movies/promenikom", k);
  }

  spisak_komentara(korime: string) {
    return this.http.get("http://localhost:3000/movies/spisakkom/" + korime);
  }

  dohvati_film_id(naziv: string, reziser: string) { 
    const data = {
      naziv: naziv,
      reziser : reziser
    }
    return this.http.post("http://localhost:3000/movies/idfilma", data);
  }

  dohvati_sve_paginacija(korime: string) {
    return this.http.get("http://localhost:3000/movies/dohvatizapaginaciju/"+ korime);
  }

  dohvati_pogledane(korime: string) {
    return this.http.get("http://localhost:3000/movies/pogledanifilmovi/"+ korime);
  }

  dohvati_trenutno(korime: string) {
    return this.http.get("http://localhost:3000/movies/trenutnofilmovi/"+ korime);
  }

  dohvati_lista(korime: string) {
    return this.http.get("http://localhost:3000/movies/listafilma/"+ korime);
  }

  dohvati_korisnika_po_korime(korime: string) {
    return this.http.get(`http://localhost:3000/users/getuser/${korime}`);
  }

  piechart(korime: string) {
    return this.http.post("http://localhost:3000/movies/piechart", {korime: korime});
  }

  dohvati_pracene(korime: string) {
    return this.http.post("http://localhost:3000/movies/praceni", {korime: korime});
  }
}
