import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../interfaces/location.interface';
import { AuthService } from './auth.service';
import { environment } from 'src/env/env';



@Injectable({
  providedIn: 'root',
})
export class LocationService {
  location!: Location;
  message!: String;
  private locationSource = new BehaviorSubject(this.location);
  currentLocation = this.locationSource.asObservable();
  private apiURL = environment.API_URL + '/location/';
  private apiURLGetAll = environment.API_URL + '/location/all';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // OK
  getAllLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiURLGetAll);
  }

  getLocations( numPage: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiURLGetAll +'/'+ numPage);
  }

  getLocation(id: string): Observable<Location> {
    return this.http.get<Location>(this.apiURL + id);
  } // OK

  updateLocation(location: Location, id: string): Observable<Location> {
    return this.http.put<Location>(this.apiURL + id, location);
  }

  // OK
  /*
  deleteLocation(id: string): Observable<Location> {
    return this.http.delete<Location>(this.apiURL + id);
  }
  */
  // OK
  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.apiURL, location);
  }

  deleteLocation(id: any): Observable<Location> {
    return this.http.delete<Location>(this.apiURL + '/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken(),
      })
    });
  }


  getCountLocation():Observable<string>{
    return this.http.get<string>(this.apiURL+"all/count/docs");
  }

}

