import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../interfaces/comment.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comment!: Comment ;
  message!: String;
  private apiURL = environment.API_URL + '/comment/';
  private apiURLall=environment.API_URL+'/comments/all';
  private apiURLresponses=environment.API_URL+'/commentresponses/list/responses/';
  constructor(private http: HttpClient, private authService: AuthService) { }


  // (1) Get (obtain) comments ...
  getComments(idPublicationComment: string, numPage: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiURL + 'publication/by/paginated/' +idPublicationComment +'/'+ numPage,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (2) Post (creation) of a comment of a publication ...
  addComment(comment: Comment): Observable<Comment>{
    return this.http.post<Comment>(this.apiURL +'add',comment,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (3) Post (creation) of an answer to a comment ...
  responseComment(comment: Comment, idComment: string): Observable<Comment>{
    return this.http.post<Comment>(this.apiURL + 'response/' + idComment, comment,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (4) Put (edition) of a comment ...
  editComment(comment:Comment, idComment: string): Observable<Comment>{
    return this.http.put<Comment>(this.apiURL + idComment, comment,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  editCommentLikes(comment:Comment, idComment: string,idUser:string): Observable<Comment>{
    return this.http.put<Comment>(this.apiURL +'likes/'+ idComment+'/'+ idUser, comment,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (5) Delete comment ...
  deleteComment(idComment: string):  Observable<Comment>{
    return this.http.delete<Comment>(this.apiURL + idComment,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  } 

  // (6) Get all comments
  getAllComments ():  Observable<Comment[]>{
    return this.http.get<Comment[]>(this.apiURLall,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  } 

   // (7) Get (obtain) comment ...
  getComment(idComment: string): Observable<Comment> {
    return this.http.get<Comment>(this.apiURL + 'comment/id/'+ idComment,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (9) Get all paginated comments
  getAllPaginatedComments (numPage:string):  Observable<Comment[]>{
    return this.http.get<Comment[]>(this.apiURL + 'paginated/page/num/'+ numPage,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  } 

  // (10) Get response comments of a comment
  getResponsesOfParticularComment (idComment:string, numPage:string):  Observable<Comment[]>{
    return this.http.get<Comment[]>(this.apiURLresponses + idComment+ '/' +numPage,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  } 

  getCountComment():Observable<string>{
    return this.http.get<string>(this.apiURL+"number",{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

};

