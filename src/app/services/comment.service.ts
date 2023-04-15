import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../interfaces/comment.interface';



@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comment!: Comment ;
  message!: String;
  private apiURL = 'http://localhost:5432/comment/';
  constructor(private http: HttpClient) { }


  // (1) Get (obtain) comments ...
  getComments(idPublicationComment: string, numPage: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiURL + idPublicationComment +'/' + numPage);
  }

  // (2) Post (creation) of a comment of a publication ...
  addComment(comment: Comment): Observable<Comment>{
    return this.http.post<Comment>(this.apiURL + 'createComment',comment);
  }

  // (3) Post (creation) of an answer to a comment ...
  responseComment(comment: Comment, idComment: string): Observable<Comment>{
    return this.http.post<Comment>(this.apiURL + 'createComment/' + idComment, comment);
  }

  // (4) Put (edition) of a comment ...
  editComment(comment:Comment, idComment: string): Observable<Comment>{
    return this.http.put<Comment>(this.apiURL + 'updateComment/' + idComment, comment);
  }

  // (5) Delete comment ...
  deleteComment(idComment: string):  Observable<Comment>{
    return this.http.delete<Comment>(this.apiURL + 'deleteComment/' + idComment);
  } 

  // (6) Get all comments
  getAllComments ():  Observable<Comment[]>{
    return this.http.get<Comment[]>(this.apiURL + 'getAllComments');
  } 

   // (7) Get (obtain) comment ...
   getComment(idComment: string): Observable<Comment> {
    return this.http.get<Comment>(this.apiURL + 'getComment/'+ idComment);
  }
};

