import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { LogIn } from '../interfaces/login.interface';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;
  message!: String;
  private userSource = new BehaviorSubject(this.user);
  currentUser = this.userSource.asObservable();
  private apiURL = environment.API_URL + '/user/';
  private apiURLFollower= environment.API_URL + '/user/follower/'
  private apiURLFollowed= environment.API_URL + '/user/followed/'

  private apiURLGetAll= environment.API_URL + '/user/all';
  private apiURLGetAll2=environment.API_URL + '/user/users/all';
  private apiRegister= environment.API_URL + '/auth/register';
  constructor(private http: HttpClient) { }

  // OK
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLGetAll2 );
  }

  getFollowers(id:string, numPage:string):Observable<User[]>{
    return this.http.get<User[]>(this.apiURLFollower + id + '/' + numPage );  
  }

  getFollowed(id:string, numPage:string):Observable<User[]>{
    return this.http.get<User[]>(this.apiURLFollowed + id + '/' + numPage);  
  }

  getUsersPag(numPage:string): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLGetAll +'/'+ numPage);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.apiURL + id);
  }  // OK
  delete(id: string): Observable<User> {
    return this.http.delete<User>(this.apiURL + id);
  }

  /*
  logIn(userData:LogIn): Observable<HttpResponse<LogIn>>{
    return this.http.post<LogIn>('http://localhost:5432/api/auth/login/', userData, {observe: 'response'})
  }
  */

  newUserLogged(user: User) {
    this.userSource.next(user);
  }

  // OK
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiRegister, user)
  }

  updateUser(user: User,id:string): Observable<User> {
    return this.http.put<User>(this.apiURL + id, user)
  }

  getCountUser():Observable<string>{
    return this.http.get<string>(this.apiURL+"all/count/docs");
  }

}