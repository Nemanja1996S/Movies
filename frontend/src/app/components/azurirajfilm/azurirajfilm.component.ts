import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Film } from 'src/app/interfaces/film';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Zanr } from 'src/app/interfaces/zanr';

@Component({
  selector: 'app-azurirajfilm',
  templateUrl: './azurirajfilm.component.html',
  styleUrls: ['./azurirajfilm.component.css']
})
export class AzurirajfilmComponent implements OnInit {

  _id: string;
  film: Film = {} as Film;
  zanrovi: string[] = [];
  poruka: string

  constructor(
    private movie: MovieService,
    private ruter: Router,
    private route: ActivatedRoute,
    private admin: AdminService
    ) { }

  ngOnInit(): void {
    
    this.poruka = "";
    this._id = this.route.snapshot.paramMap.get('id');
    this.movie.dohvati_id(this._id).subscribe((data: Film) => {
     // console.log(data);
      data.datum = new Date(data.datum);
      this.film = data;
      this.dohvati_zanrove();
    }, err => {
      console.log(err);
    } 
      
    );
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

  azuriranje(form: NgForm) {
    if(form.invalid) {
      return;
    }
    if(this.film.zanrovi.length >3 ) {
      this.poruka = "Mozete izabrati maksimalno 3 zanra";
      return;
    }
    this.movie.azuriraj_film(this.film).subscribe( response => {
      console.log(response);  
      this.ruter.navigate(['/administrator/pregled']);
    }, err => {
      console.log(err); 
    } );
  }

}
