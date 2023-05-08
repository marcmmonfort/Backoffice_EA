import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Publication } from '../interfaces/publication.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  publication!: Publication;
  message!: String;
  private apiURL = environment.API_URL + '/publication/';
  private apiURLall=environment.API_URL+'/publication/all'
  private apiURLall2=environment.API_URL+'/publications/all'
  constructor(private http: HttpClient, private authService: AuthService) { }


  // (1) Get (obtain) comments ...
  getNumPublications(numPage: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.apiURLall +'/' + numPage,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (2) Get one publication by id ...
  getPublication(idPublication: string): Observable<Publication> {
    return this.http.get<Publication>(this.apiURL + idPublication,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (3) Post (creation) of a publication ...
  addPublication(publication: Publication): Observable<Publication>{
    return this.http.post<Publication>(this.apiURL,publication,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (4) Put (edition) of a publication ...
  editPublication(publication: Publication, idPublication: string): Observable<Publication>{
    return this.http.put<Publication>(this.apiURL + idPublication, publication,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  updateLikes(publication: Publication, idPublication: string): Observable<Publication>{
    return this.http.put<Publication>(this.apiURL + 'parameter/like', publication,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (5) Delete publication ...
  deletePublication(idPublication: string):  Observable<Publication>{
    return this.http.delete<Publication>(this.apiURL + idPublication,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  } 

  // (6) Get all publications ...
  getAllPublications():  Observable<Publication[]>{
    return this.http.get<Publication[]>(this.apiURLall2,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }
  getCountPublication():Observable<string>{
    return this.http.get<string>(this.apiURLall+"/count/docs",{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

};

