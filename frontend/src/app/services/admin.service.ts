import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  korisnici_neregistrovani() {
    return this.http.get("http://localhost:3000/users/get_unregistered");
  }

  korisnici_registrovani() {
    return this.http.get("http://localhost:3000/users/get_registered");
  }

  potvrdi(korime: string) {
    return this.http.post("http://localhost:3000/users/potvrdi", {korime: korime});
  }

  odbaci(korime: string) {
    return this.http.post("http://localhost:3000/users/odbaci", {korime: korime});
  }

  dodeli(korime: string) {
    return this.http.post("http://localhost:3000/users/dodeli", {korime: korime});
  }
  
  oduzmi(korime: string) {
    return this.http.post("http://localhost:3000/users/oduzmi", {korime: korime});
  }

  dodaj_zanr(naziv: string) {
    return this.http.post("http://localhost:3000/movies/dodajzanr", {naziv: naziv});
  }

  dohvati_zanrove() {
    return this.http.get("http://localhost:3000/movies/dohvatizanrove");
  }

  obrisi_zanr(naziv: string) {
    return this.http.delete("http://localhost:3000/movies/obrisizanr/" + naziv);
  }

}
