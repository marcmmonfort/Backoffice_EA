import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Application } from '../interfaces/application.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  application!: Application;
  private apiURL = environment.API_URL + '/application/';
  private apiURLall = environment.API_URL + '/applications/all';
  constructor(private http: HttpClient, private authService: AuthService) {}

  // (1) Post (creation) of an application ...
  addApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiURL + 'add', application, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (2) Put (edition) of an application ...
  editApplication(
    application: Application,
    idApplication: string
  ): Observable<Application> {
    return this.http.put<Application>(
      this.apiURL + idApplication,
      application,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.authService.getToken(),
        }),
      }
    );
  }

  // (3) Delete an application ...
  deleteApplication(idApplication: string): Observable<Application> {
    return this.http.delete<Application>(this.apiURL + idApplication, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (4) Get all application ...
  getAllApplication(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiURLall, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (5) Get (obtain) a particular application ...
  getApplication(idApplication: string): Observable<Application> {
    return this.http.get<Application>(this.apiURL + idApplication, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (6) Get all paginated applications
  getAllPaginatedApplications(numPage: string): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiURL + 'paginated/' + numPage, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }
  getCountApplication(): Observable<string> {
    return this.http.get<string>(this.apiURL + 'all/count/docs',{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }
}
