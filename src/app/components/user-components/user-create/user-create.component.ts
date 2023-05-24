import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup | any;
  isModalOpen:boolean=false;


  constructor(private formBuilder: FormBuilder, private userService: UserService,private authservice:AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      appUser: ['', Validators.required],
      nameUser: ['', Validators.required],
      surnameUser: ['', Validators.required],
      mailUser: ['', [Validators.required, Validators.email]],
      passwordUser: ['', Validators.required],
      photoUser: ['', Validators.required],
      birthdateUser: ['', Validators.required],
      genderUser: ['', Validators.required],
      ocupationUser: ['', Validators.required],
      descriptionUser: ['', Validators.required],
      privacyUser: [false, Validators.required],
      roleUser: ['common', Validators.required],
      deletedUser: [false, Validators.required]
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      alert('Por favor, completa todos los campos requeridos')
      this.router.navigate(['/listUsers']);
    }
    this.openModal();
  }
  confirmChanges(): void {
    const userData = this.userForm.value;
    this.authservice.addUser(userData).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'Usuario creado correctamente!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })
        console.log('Usuario guardado correctamente:', response);
        // Aquí podrías redirigir a la página de éxito, por ejemplo
      },
      (error) => {
        console.error('Error al guardar usuario:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
    this.closeModal();
  }
  onAcceptChanges(): void {
    this.confirmChanges();
    this.ngOnInit();

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

