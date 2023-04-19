import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publication } from '../interfaces/publication.interface';



@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  publication!: Publication;
  message!: String;
  private apiURL = 'http://localhost:5432/publication/';
  constructor(private http: HttpClient) { }


  // (1) Get (obtain) comments ...
  getNumPublications(numPage: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiURL +'getPublications/' + numPage);
  }

  // (2) Get one publication by id ...
  getPublication(idPublication: string): Observable<Publication> {
    return this.http.get<Publication>(this.apiURL + 'getPublication/'+ idPublication);
  }

  // (3) Post (creation) of a publication ...
  addPublication(publication: Publication): Observable<Publication>{
    return this.http.post<Publication>(this.apiURL + 'createPublication',publication);
  }

  // (4) Put (edition) of a publication ...
  editPublication(publication: Publication, idPublication: string): Observable<Publication>{
    return this.http.put<Publication>(this.apiURL + 'updatePublication/' + idPublication, publication);
  }

  // (5) Delete publication ...
  deletePublication(idPublication: string):  Observable<Publication>{
    return this.http.delete<Publication>(this.apiURL + 'deletePublication/' + idPublication);
  } 

  // (6) Get all publications ...
  getAllPublications():  Observable<Publication[]>{
    return this.http.get<Publication[]>(this.apiURL + 'getAllPublications');
  }

};

