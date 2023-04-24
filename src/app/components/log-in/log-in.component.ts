import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { KnownService } from 'src/app/services/known.service';
import Swal from 'sweetalert2';


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
    localStorage.setItem('token','');
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
        
        // alert("¡LogIn efectuado correctamente!");

        // Poner aquí el alert ...
        Swal.fire({
          position: 'center',
          icon: 'success',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'LogIn succesful!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })
        
        // Aquí deberíamos hacer el cambio de la barra de navigate ...

        localStorage.setItem('token',data.token);
        
        this.knownService.updateUserKnown(true);
        this.router.navigate(['/']);
      },(error:any)=>{

        // alert("¡No existe ningún usuario con estas credenciales!");console.log(error)

        // Poner aquí el alert ...
        Swal.fire({
          position: 'center',
          icon: 'success',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'This user does not exist!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })

        this.router.navigate(['/register']);
      });
  }


}
