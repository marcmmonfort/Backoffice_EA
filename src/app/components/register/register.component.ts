import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup | any;
  userKnown:boolean=false;
  isModalOpen:boolean=false;

  constructor(private formBuilder: FormBuilder, private registerService: AuthService, private router: Router) {
    
    this.registerForm = this.formBuilder.group({
      "appUser": ['', Validators.required],
      "nameUser": ['', Validators.required],
      "surnameUser": ['', Validators.required],
      "mailUser": ['', [Validators.required, Validators.email]],
      "passwordUser": ['', Validators.required],
      "photoUser": ['', Validators.required],
      "birthdateUser": ['', Validators.required],
      "genderUser": ['', Validators.required],
      "ocupationUser": ['', Validators.required],
      "descriptionUser": ['', Validators.required],
      "privacyUser": [false, Validators.required],
      "roleUser": ['admin', Validators.required],
      "deletedUser": [false, Validators.required]
    });
  }
  
  ngOnInit(): void {
    localStorage.setItem('token','');
  }

  get f() {
    return this.registerForm.controls;
  }

  register(): void{
    if (this.registerForm.invalid) {
      return;
    }
    this.openModal();
  }

  confirmChanges(): void {
    const userData = this.registerForm.value;
    this.registerService.addUser(userData).subscribe(
      (data:any)=>{
        console.log(data);
      
        Swal.fire({
          position: 'center',
          icon: 'success',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'Register succefull!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })

        this.router.navigate(['/login']);
      },(error:any)=>{
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'This user already exists!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })

      });
    this.closeModal();
  }

  onAcceptChanges(): void {
    this.confirmChanges();
  }

  onCancelChanges(): void {
    this.isModalOpen = false;
  }
  
  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }

}
