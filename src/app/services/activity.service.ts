import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activity } from '../interfaces/activity.interface';

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

};