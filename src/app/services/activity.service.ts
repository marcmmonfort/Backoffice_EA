import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activity } from '../interfaces/activity.interface';
import { User } from '../interfaces/user.interface';
import { environment } from 'src/env/env';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activity!: Activity ;
  message!: String;
  private apiURL = environment.API_URL + '/activity/';
  private apiURLall = environment.API_URL+ '/activities/all';
  constructor(private http: HttpClient, private authService: AuthService) { }

  // (1) Post (creation) of an activity ...
  // Ruta >> "/createActivity"
  addActivity(activity: Activity): Observable<Activity>{
    return this.http.post<Activity>(this.apiURL + 'add',activity,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }
  
  // (2) Put (edition) of an activity ...
  // Ruta >> "/updateActivity/:idActivity"
  editActivity(activity:Activity, idActivity: string): Observable<Activity>{
    return this.http.put<Activity>(this.apiURL + idActivity, activity,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }
  
  // (3) Delete an activity ...
  // Ruta >> "/deleteActivity/:idActivity"
  deleteActivity(idActivity: string):  Observable<Activity>{
    return this.http.delete<Activity>(this.apiURL + idActivity,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  } 
  
  // (4) Get all activities ...
  // Ruta >> "/getAllActivities"
  getAllActivities ():  Observable<Activity[]>{
    return this.http.get<Activity[]>(this.apiURLall,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  } 
  
  // (5) Get (obtain) a particular activity ...
  // Ruta >> "/getActivity/:idActivity"
  getActivity(idActivity: string): Observable<Activity> {
    return this.http.get<Activity>(this.apiURL + idActivity,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }
  getCountActivity():Observable<string>{
    return this.http.get<string>(this.apiURL+"all/count/docs",{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (6) Get all paginated activities
  getAllPaginatedActivities(numPage:string):Observable<Activity[]> {
    return this.http.get<Activity[]>(this.apiURL + 'paginated/' + numPage,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

  // (7) Get participants of an activity
  getParticipantsOfParticularActivity(idActivity:string, numPage:string):Observable<User[]> {
    return this.http.get<User[]>(this.apiURL + 'all/participants/' + idActivity + '/' + numPage,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    });
  }

};