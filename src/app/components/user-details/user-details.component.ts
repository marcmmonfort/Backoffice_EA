import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details', 
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

  userData: any;
  userId!: string;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.userId = parts[parts.length - 1];
    console.log(this.userId);
    this.userService.getUser(this.userId).subscribe(userData=>{
      this.userData=userData;
    });
  }
  getRolText(rol: string): string {
    switch (rol) {
      case 'admin':
        return 'Administrador/a';
      case 'common':
        return 'Cuenta común';
      case 'verified':
        return 'Cuenta verificada';
      case 'business':
        return 'Cuenta de Empresa';
      default:
        return rol;
    }
  }
  
}
