import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activity } from '../interfaces/activity.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activity!: Activity ;
  message!: String;
  private apiURL = 'http://localhost:5432/activity/';
  constructor(private http: HttpClient) { }

  // (1) Post (creation) of an activity ...
  // Ruta >> "/createActivity"
  addActivity(activity: Activity): Observable<Activity>{
    return this.http.post<Activity>(this.apiURL + 'createActivity',activity);
  }
  
  // (2) Put (edition) of an activity ...
  // Ruta >> "/updateActivity/:idActivity"
  editActivity(activity:Activity, idActivity: string): Observable<Activity>{
    return this.http.put<Activity>(this.apiURL + 'updateActivity/' + idActivity, activity);
  }
  
  // (3) Delete an activity ...
  // Ruta >> "/deleteActivity/:idActivity"
  deleteActivity(idActivity: string):  Observable<Activity>{
    return this.http.delete<Activity>(this.apiURL + 'deleteActivity/' + idActivity);
  } 
  
  // (4) Get all activities ...
  // Ruta >> "/getAllActivities"
  getAllActivities ():  Observable<Activity[]>{
    return this.http.get<Activity[]>(this.apiURL + 'getAllActivities');
  } 
  
  // (5) Get (obtain) a particular activity ...
  // Ruta >> "/getActivity/:idActivity"
  getActivity(idActivity: string): Observable<Activity> {
    return this.http.get<Activity>(this.apiURL + 'getActivity/'+ idActivity);
  }
  getCountActivity():Observable<string>{
    return this.http.get<string>(this.apiURL+"all/count/docs");
  }

  // (6) Get all paginated activities
  getAllPaginatedActivities(numPage:string):Observable<Activity[]> {
    return this.http.get<Activity[]>(this.apiURL + 'getAllPaginatedActivities/' + numPage);
  }

  // (7) Get participants of an activity
  getParticipantsOfParticularActivity(idActivity:string, numPage:string):Observable<User[]> {
    return this.http.get<User[]>(this.apiURL + 'getParticipantsOfActivity/' + idActivity + '/' + numPage);
  }

};