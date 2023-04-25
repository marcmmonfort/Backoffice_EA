import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KnownService } from '../services/known.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService, private router:Router){

  }
  
  canActivate(){
    if(this.auth.isLoggedIn()){
      console.log(this.auth.isLoggedIn());
      return true;
    }

    // Poner aquí el alert ...
    Swal.fire({
      position: 'center',
      icon: 'error',
      customClass: {
        icon: 'swal-icon-color'
      },
      title: 'Stop!',
      text: 'You must login before!',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 1500,
      backdrop: `
      rgba(0,0,0,0.8)
      `
    })

    this.router.navigate(['/login']);
    return false;
  }
    
  
}
