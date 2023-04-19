import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { KnownService } from 'src/app/services/known.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  
  loginForm: FormGroup | any;
  userKnown:boolean=false;

  constructor(private formBuilder: FormBuilder, private loginService: AuthService, private knownService: KnownService, private router: Router) {
    
    this.loginForm = this.formBuilder.group({
      "mailUser": ['', [Validators.required, Validators.email]],
      "passwordUser": ['', Validators.required]
    });
  }
  
  
  ngOnInit(): void {
    this.knownService.getUserKnown().subscribe(userKnown => {
      this.userKnown = userKnown;
    });
  }
  

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
        // Aquí deberíamos hacer el cambio de la barra de navigate ...
        this.knownService.updateUserKnown(true);
        this.router.navigate(['/']);
      },(error:any)=>{
        alert("¡No existe ningún usuario con estas credenciales!");console.log(error)
        this.router.navigate(['/register']);
      });
  }


}
