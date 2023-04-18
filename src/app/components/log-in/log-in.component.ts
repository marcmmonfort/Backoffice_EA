import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogIn } from 'src/app/interfaces/login.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  
  auth!: LogIn;
  loginForm: FormGroup | any;
  userKnown:boolean=false;

  constructor(private formBuilder: FormBuilder, private loginService: AuthService, private router: Router) {} //, private tokenStorage: TokenStorage
  
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      "mailUser": ['', [Validators.required, Validators.email]],
      "passwordUser": ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login(): void{
    const auth = this.loginForm.value;
    console.log(this.loginForm.value);
    this.loginService.logIn(this.auth).subscribe(
      (data:any)=>{
        // this.tokenStorage.saveToken(data.token);
        this.router.navigate(['/register']);
      },(error:any)=>{alert("Wrong credentials!!");console.log(error)});
  }

}
