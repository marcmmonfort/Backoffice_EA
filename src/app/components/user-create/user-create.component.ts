import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userForm: FormGroup | any;
  isModalOpen:boolean=false;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

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
      return;
    }
    this.openModal();
  
    const userData = this.userForm.value;
    this.userService.addUser(userData).subscribe(
      (response) => {
        console.log('Usuario guardado correctamente:', response);
        // Aquí podrías redirigir a la página de éxito, por ejemplo
      },
      (error) => {
        console.error('Error al guardar usuario:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
  }
  confirmChanges(): void {
    const userData = this.userForm.value;
    this.userService.addUser(userData).subscribe(
      (response) => {
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

