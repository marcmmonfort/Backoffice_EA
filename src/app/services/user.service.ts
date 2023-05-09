import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { LogIn } from '../interfaces/login.interface';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user!: User;
  message!: String;
  private userSource = new BehaviorSubject(this.user);
  currentUser = this.userSource.asObservable();
  private apiURL = environment.API_URL + '/user/';
  private apiURLFollower = environment.API_URL + '/user/follower/';
  private apiURLFollowed = environment.API_URL + '/user/followed/';

  private apiURLGetAll = environment.API_URL + '/users/all';
  private apiURLGetAll2 = environment.API_URL + '/user/all';
  //private apiRegister = environment.API_URL + '/auth/register';
  constructor(private http: HttpClient, private authService: AuthService) {}

  // OK
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLGetAll, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  getFollowers(id: string, numPage: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLFollower + id + '/' + numPage, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  getFollowed(id: string, numPage: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLFollowed + id + '/' + numPage, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  getUsersPag(numPage: string): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLGetAll2 + '/' + numPage, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.apiURL + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  } // OK

  delete(id: string): Observable<User> {
    return this.http.delete<User>(this.apiURL + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  /*
  logIn(userData:LogIn): Observable<HttpResponse<LogIn>>{
    return this.http.post<LogIn>('http://localhost:5432/api/auth/login/', userData, {observe: 'response'})
  }
  */

  newUserLogged(user: User) {
    this.userSource.next(user);
  }
  updateUser(user: User, id: string): Observable<User> {
    return this.http.put<User>(this.apiURL + id, user,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }
  getCountUser(): Observable<string> {
    return this.http.get<string>(this.apiURL + 'all/count/docs',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }
}