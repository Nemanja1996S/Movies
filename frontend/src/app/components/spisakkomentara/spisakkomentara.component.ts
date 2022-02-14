import { Component, OnInit } from '@angular/core';
import { Komentar } from 'src/app/interfaces/komentar';
import { RegkorService } from 'src/app/services/regkor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spisakkomentara',
  templateUrl: './spisakkomentara.component.html',
  styleUrls: ['./spisakkomentara.component.css']
})
export class SpisakkomentaraComponent implements OnInit {

  korime: string;
  komentari: Komentar[] = [];
  displayedColumns: string[] = ['naziv', 'reziser','ocena', 'komentar'];

  constructor(
    private regkor: RegkorService,
    private ruter: Router
    ) { }

  ngOnInit(): void {
    this.korime = localStorage.getItem("korime");
    this.regkor.spisak_komentara(this.korime).subscribe((response: any) => {
      //console.log(response);
      this.komentari = response.comments;
    }, err => {
      console.log(err);
    })
  }

  film(komentar: Komentar) {
    this.regkor.dohvati_film_id(komentar.naziv, komentar.reziser).subscribe((response: any) => {
      this.ruter.navigate([`korisnik/film/${response.id}`]);
    }, err => {
      console.log(err);
    });
  }

}
