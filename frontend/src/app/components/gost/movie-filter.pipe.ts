import { PipeTransform, Pipe } from '@angular/core';
import { Film } from 'src/app/interfaces/film';

@Pipe({
    name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {
    transform(movies: Film[], searchTerm1: string, searchTerm2: string, searchTerm3: string,): Film[] {

        if(!searchTerm1) {
            searchTerm1 = "";
        }

        if(!searchTerm2) {
            searchTerm2 = "";
        }

        if(!searchTerm3) {
            searchTerm3 = "";
        }

        if (!movies || (!searchTerm1 && !searchTerm2 && !searchTerm3)) {
            return movies;
        }

        let movief1 = movies.filter(movie =>
            movie.naziv.toLowerCase().indexOf(searchTerm1.toLowerCase()) !== -1
            );

        let movief2 = movief1.filter(movie => //{
            //alert(searchTerm2);
            //alert(movie.autori);
           // movie.autori.toString().includes(searchTerm2) //}
            movie.reziser.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1
            );    

        let movief3 = movief2.filter(movie => 
            movie.zanrovi.join(',').toLowerCase().indexOf(searchTerm3.toLowerCase()) !== -1
            );

        return movief3; 
       /* return movies.filter(movie =>
            movie.naziv.toLowerCase().indexOf(searchTerm1.toLowerCase()) !== -1
            ||
            movie.opis.toLowerCase().indexOf(searchTerm2.toLowerCase()) !== -1)
            ;*/
    }
}