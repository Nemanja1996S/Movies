import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/film';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregledfilma',
  templateUrl: './pregledfilma.component.html',
  styleUrls: ['./pregledfilma.component.css']
})
export class PregledfilmaComponent implements OnInit {

  filmovi: Film[];
  displayedColumns: string[] = ['naziv', 'reziser', 'datum', 'zanr', 'odobren', 'azuriranje'];

  constructor(private movie: MovieService, private ruter: Router) { }

  ngOnInit(): void {
    this.filmovi = [];
    this.movie.dohvati_sve_filmove().subscribe((data: Film[]) => {
      this.filmovi = data;
      for(let i=0; i<data.length; i++) {
        this.filmovi[i].datum = new Date(data[i].datum);
      }
    },  err => {
      console.log(err);
    });
  }

  azuriraj(film: Film) {
    this.ruter.navigate(["/administrator/azuriranje/", film._id]);
  }

}
