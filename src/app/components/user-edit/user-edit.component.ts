import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  userData: any;
  userId!: string;
  
  constructor(private route: ActivatedRoute, private userService: UserService,private router:Router) {}

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
  onSubmit():void{
    this.userService.updateUser(this.userData, this.userId).subscribe(() => {
      alert('Los datos se han actualizado correctamente.');
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

  showFollowers(user:any):void{
    this.router.navigate(['user-details/followers',user.id])
  }
  showFollowed(user:any):void{
    this.router.navigate(['user-details/followed',user.id])
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  
}
