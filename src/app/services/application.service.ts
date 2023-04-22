import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Application } from '../interfaces/application.interface';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  application!: Application ;
  private apiURL = 'http://localhost:5432/application/';
  constructor(private http: HttpClient) { }

  // (1) Post (creation) of an application ...
  addApplication(application: Application): Observable<Application>{
    return this.http.post<Application>(this.apiURL + 'createApplication',application);
  }
  
  // (2) Put (edition) of an application ...
  editApplication(application:Application, idApplication: string): Observable<Application>{
    return this.http.put<Application>(this.apiURL + 'updateApplication/' + idApplication, application);
  }
  
  // (3) Delete an application ...
  deleteApplication(idApplication: string):  Observable<Application>{
    return this.http.delete<Application>(this.apiURL + 'deleteApplication/' + idApplication);
  } 
  
  // (4) Get all application ...
  getAllApplication():  Observable<Application[]>{
    return this.http.get<Application[]>(this.apiURL + 'getAllApplications');
  } 
  
  // (5) Get (obtain) a particular application ...
  getApplication(idApplication: string): Observable<Application> {
    return this.http.get<Application>(this.apiURL + 'getApplication/'+ idApplication);
  }

  // (6) Get all paginated applications
  getAllPaginatedApplications(numPage:string):  Observable<Application[]>{
    return this.http.get<Application[]>(this.apiURL + 'getAllPaginatedApplications/' + numPage);
  } 

};