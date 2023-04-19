import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { LogIn } from '../interfaces/login.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;
  message!: String;
  private userSource = new BehaviorSubject(this.user);
  currentUser = this.userSource.asObservable();
  private apiURL = 'http://localhost:8001/user/';
  private apiURLGetAll='http://localhost:8001/user/all';
  private apiRegister='http://localhost:8001/auth/register';
  constructor(private http: HttpClient) { }

  // OK
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLGetAll);
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

}