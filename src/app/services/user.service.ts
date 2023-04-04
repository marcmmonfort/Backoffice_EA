import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogIn } from '../interfaces/login.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;
  message!: String;
  private userSource = new BehaviorSubject(this.user);
  currentUser = this.userSource.asObservable();
  private apiURL = 'http://localhost:8001/api/user/';
  private apiURLGetAll='http://localhost:8001/user/all';
  constructor(private http: HttpClient) { }

  // OK
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiURLGetAll);
  }

  // OK
  delete(id: string): Observable<User> {
    return this.http.delete<User>(this.apiURL + id);
  }

  // OK
  logIn(userData:LogIn): Observable<HttpResponse<User>>{
    return this.http.post<User>('http://localhost:8001/api/auth/login/', userData, {observe: 'response'})
  }

  newUserLogged(user: User) {
    this.userSource.next(user);
  }

  // OK
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiURL, user)
  }
}