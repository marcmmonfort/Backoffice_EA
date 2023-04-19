import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/interfaces/login.interface';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  
  loginForm: FormGroup | any;
  userKnown:boolean=false;

  constructor(private formBuilder: FormBuilder, private loginService: AuthService, private router: Router) {
    
    this.loginForm = this.formBuilder.group({
      "mailUser": ['', [Validators.required, Validators.email]],
      "passwordUser": ['', Validators.required]
    });
  }
  
  /*
  ngOnInit(): void {}
  */

  get f() {
    return this.loginForm.controls;
  }

  login(): void{
    const authData = this.loginForm.value;
    console.log("Mail:",this.loginForm.value.mailUser);
    console.log("Password:",this.loginForm.value.passwordUser);
    this.loginService.logIn(authData).subscribe(
      (data:any)=>{
        // this.tokenStorage.saveToken(data.token);
        console.log(data);
        alert("¡LogIn efectuado correctamente!");
        this.router.navigate(['/']);
      },(error:any)=>{
        alert("¡No existe ningún usuario con estas credenciales!");console.log(error)
        this.router.navigate(['/register']);
      });
  }

}
