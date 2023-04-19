import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KnownService {
  private userKnown = new BehaviorSubject<boolean>(false);

  updateUserKnown(userKnown: boolean): void {
    this.userKnown.next(userKnown);
  }

  getUserKnown(): Observable<boolean> {
    return this.userKnown.asObservable();
  }
}
