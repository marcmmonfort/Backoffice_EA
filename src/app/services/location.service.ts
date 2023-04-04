import { HttpClient,HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Location } from '../interfaces/location.interface';


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  location!: Location;
  message!: String;
  private locationSource = new BehaviorSubject(this.location);
  currentLocation = this.locationSource.asObservable();
  private apiURL = 'http://localhost:5432/api/users/';
  constructor(private http: HttpClient) { }

  // OK
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiURL);
  }

  // OK
  deleteLocation(id: string): Observable<Location> {
    return this.http.delete<Location>(this.apiURL + id);
  }

  // OK
  logIn(locationData:Location): Observable<HttpResponse<Location>>{
    return this.http.post<Location>('http://localhost:5432/api/auth/login/', locationData, {observe: 'response'})
  }

  newLocationLogged(user: Location) {
    this.locationSource.next(user);
  }

  // OK
  addLocation(user: Location): Observable<Location> {
    return this.http.post<Location>(this.apiURL, location)
  }
}