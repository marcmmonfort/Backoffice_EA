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
  private apiURL = 'http://localhost:8001/location/';
  private apiURLGetAll='http://localhost:8001/location/all';
  private apiRegister='http://localhost:8001/auth/register';
  constructor(private http: HttpClient) { }

  // OK
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiURL);
  }

  getLocation(id: string): Observable<Location> {
    return this.http.get<Location>(this.apiURL + id);
  }  // OK

  updateLocation(location: Location,id:string): Observable<Location> {
    return this.http.put<Location>(this.apiURL + id, location)
  }

  // OK
  deleteLocation(id: string): Observable<Location> {
    return this.http.delete<Location>(this.apiURL + id);
  }

  // OK
  logIn(locationData:Location): Observable<HttpResponse<Location>>{
    return this.http.post<Location>('http://localhost:8001/api/auth/login/', locationData, {observe: 'response'})
  }

  newLocationLogged(location: Location) {
    this.locationSource.next(location);
  }

  // OK
  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(this.apiURL, location)
  }
}