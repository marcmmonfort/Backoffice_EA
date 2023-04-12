import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LogIn } from 'src/app/interfaces/login.interface';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  email: string='';
  password: string='';
  auth!: LogIn;
  constructor(private loginService: UserService, private router: Router) {} //, private tokenStorage: TokenStorage
  ngOnInit(): void {
  
  }
  login() {
    this.auth={email:this.email, password:this.password};
    this.loginService.logIn(this.auth).subscribe(
      (data:any)=>{
        //this.tokenStorage.saveToken(data.token);
        this.router.navigate(['/auth/login']);
      },(error:any)=>{alert("Wrong credentials!!")});
  }

}
