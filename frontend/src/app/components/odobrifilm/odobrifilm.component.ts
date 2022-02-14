import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/film';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-odobrifilm',
  templateUrl: './odobrifilm.component.html',
  styleUrls: ['./odobrifilm.component.css']
})
export class OdobrifilmComponent implements OnInit {

  filmovi: Film[];
  displayedColumns: string[] = ['naziv', 'reziser', 'datum', 'zanr', 'odobren', 'odobravanje'];

  constructor(private movie: MovieService) { }

  ngOnInit(): void {
    this.filmovi = [];
    this.movie.dohvati_zahteve().subscribe((data: Film[]) => {
      this.filmovi = data;
      for(let i=0; i<data.length; i++) {
        this.filmovi[i].datum = new Date(data[i].datum);
      }
    },  err => {
      console.log(err);
    });
  }

  odobri(film: Film) {
    this.movie.odobri_zahtev(film._id).subscribe((response: string) => {
      console.log(response);
      this.filmovi.forEach((k, index) => {
        if(k._id == film._id) {
          this.filmovi.splice(index, 1);
        }
      });
      this.filmovi = [...this.filmovi];
      //this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }

  odbaci(film: Film) {
    this.movie.odbaci_zahtev(film._id).subscribe((response: string) => {
      console.log(response);
      this.filmovi.forEach((k, index) => {
        if(k._id == film._id) {
          this.filmovi.splice(index, 1);
        }
      });
      this.filmovi = [...this.filmovi];
      //this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }

}
