import { Component, OnInit } from '@angular/core';
import { Film } from 'src/app/interfaces/film';
import { ActivatedRoute, Router } from '@angular/router';
import { Komentar } from 'src/app/interfaces/komentar';
import { RegkorService } from 'src/app/services/regkor.service';

@Component({
  selector: 'app-filmgost',
  templateUrl: './filmgost.component.html',
  styleUrls: ['./filmgost.component.css']
})
export class FilmgostComponent implements OnInit {

  id: string;
  film: Film = {} as Film;
  komentari: Komentar[] = [];

  constructor(
    private route: ActivatedRoute,
    private ruter: Router,
    private regkor: RegkorService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
     this.regkor.dohvati_film_i_komentare(this.id).subscribe((data: any) => {
      data.movie.datum = new Date(data.movie.datum);
      this.film = data.movie;
      this.komentari = data.comments;
    }, err => {
      console.log(err);
    }  
    );

     //DOHVATANJE KOMENTARA
  }

  povratak() {
    this.ruter.navigate(["/gost/pretraga"]);
  } 

}
