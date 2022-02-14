import { Component, OnInit } from '@angular/core';
import { RegkorService } from 'src/app/services/regkor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Korisnik } from 'src/app/interfaces/korisnik';
import { FilmIzListe } from 'src/app/interfaces/filmizliste';
import { PageEvent } from '@angular/material/paginator';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-korisnikposeta',
  templateUrl: './korisnikposeta.component.html',
  styleUrls: ['./korisnikposeta.component.css']
})
export class KorisnikposetaComponent implements OnInit {
  //id: string = "";
  korime: string;
  korisnik: Korisnik = {} as Korisnik;
  datum: Date = null; // za poslednji put prijavljen
  pracenje: boolean = false;

  pogledano: FilmIzListe[];
  trenutno: FilmIzListe[];
  lista: FilmIzListe[];

  ukupno_pogledani = 0;
  ukupno_trenutno = 0;
  ukupno_lista = 0;

  displayedColumns: string[] = ['naziv', 'reziser', 'pristupi'];

  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  pieChartType: string = 'pie';



  constructor(
    private regkor:RegkorService,
    private ruter: Router,
    private route: ActivatedRoute,
    private user: UserService
  ) { }

  ngOnInit(): void {
    this.pogledano = [];
    this.trenutno = [];
    this.lista = [];
    this.korime = this.route.snapshot.paramMap.get('korime');
    this.regkor.dohvati_korisnika_po_korime(this.korime).subscribe((data: Korisnik) => {
      data.datum = new Date(data.datum);
      this.korisnik = data;
      this.poslednji_put_prijavljen_i_pracenje(); 
      this.dohvati_sve_paginacija();
      this.piechart();
    }, err => {
      console.log(err);
    })
  }

  dohvati_sve_paginacija() {
    this.regkor.dohvati_sve_paginacija(this.korisnik.korime).subscribe((response: any) => {
      console.log(response.message);
      this.pogledano = response.list1;
      this.ukupno_pogledani = response.count1;
      this.trenutno = response.list2;
      this.ukupno_trenutno = response.count2;
      this.lista = response.list3;
      this.ukupno_lista = response.count3;
    }, err => {
      console.log(err);
    })
  }

  dohvati_pogledane() {
    this.regkor.dohvati_pogledane(this.korisnik.korime).subscribe((response: any) => {
      this.pogledano = response.lists;
      this.ukupno_pogledani = response.count;
    }, err=> {
      console.log(err);
    });
  }

  dohvati_trenutno() {
    this.regkor.dohvati_trenutno(this.korisnik.korime).subscribe((response: any) => {
      this.trenutno = response.lists;
      this.ukupno_trenutno = response.count;
    }, err=> {
      console.log(err);
    });
  }

  dohvati_lista() {
    this.regkor.dohvati_lista(this.korisnik.korime).subscribe((response: any) => {
      this.lista = response.lists;
      this.ukupno_lista = response.count;
    }, err=> {
      console.log(err);
    });
  }


  pristupi(element: any) {
    this.regkor.dohvati_film_id(element.naziv, element.reziser).subscribe((response: any) => {
      this.ruter.navigate([`korisnik/film/${response.id}`]);
    }, err => {
      console.log(err);
    });
  }


  piechart() {
    this.regkor.piechart(this.korisnik.korime).subscribe((response: any) => {
      //console.log(response);
      let niz: any = response.array;
      if(niz.length != 0) {
        //console.log(niz);
        let brojevi = [];
        let index = 0;
        for(let i=0; i<niz.length; i++) {
          let brojac = 1;
          for(let j=i+1; j<niz.length; j++) {
            if(niz[i] == niz[j]) {
              brojac++;
              niz.splice(j, 1);
              j--;
            }
          }
          brojevi[index] = brojac;
          index++;
        }
        //console.log(niz);
       // console.log(brojevi);
       let ukupno = 0;
       for(let i=0; i<brojevi.length; i++) {
        ukupno += brojevi[i]; 
       }
       this.pieChartLabels = niz;
       for(let i=0; i<brojevi.length; i++) {
         this.pieChartData[i] = parseFloat((100*brojevi[i]/ukupno).toFixed(2));
       }
      }  
      //var counts = {};
     // niz.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
     // console.log(counts);
    }, err => {
      console.log(err);
    });
  }

  poslednji_put_prijavljen_i_pracenje() {
    let prijavljen = localStorage.getItem("korime");
    this.user.poslednji_put_dohvati(this.korisnik.korime, prijavljen).subscribe((response: any) => {
      this.pracenje = response.follow;
      if(response.date == null) {
        this.datum = null;
      } else {
        this.datum = new Date(response.date);
      }
    }, err => {
      console.log(err);
    })
  }

  zaprati() {
    let prijavljen = localStorage.getItem("korime");
    this.user.zaprati(prijavljen, this.korime).subscribe((response: string) => {
      console.log(response);
      this.pracenje = true;
    }, err => {
      console.log(err);
    }); 
  }

  otprati() {
    let prijavljen = localStorage.getItem("korime");
    this.user.otprati(prijavljen, this.korime).subscribe((response: string) => {
      console.log(response);
      this.pracenje = false;
    }, err => {
      console.log(err);
    }); 
  }

}
