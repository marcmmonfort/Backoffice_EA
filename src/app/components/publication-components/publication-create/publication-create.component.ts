import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicationService } from 'src/app/services/publication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publication-create',
  templateUrl: './publication-create.component.html',
  styleUrls: ['./publication-create.component.css']
})
export class PublicationCreateComponent {
  publicationForm: FormGroup | any;
  isModalOpen:boolean=false;
  constructor(private formBuilder: FormBuilder, private publicationService: PublicationService, private router: Router) { 
    
    this.publicationForm = this.formBuilder.group({
      "idUser": ['', Validators.required],
      "textPublication":[''],
      "photoPublication": ['', Validators.required]
      })
  }

  get f() {
    return this.publicationForm.controls;
  }

  onSubmit(): void {
    if (this.publicationForm.invalid) {
      alert('Por favor, completa todos los campos requeridos')
      this.router.navigate(['/publication']);
    }
    this.openModal();
  }

  confirmChanges(): void {
    const publicationData = this.publicationForm.value;
    console.log(publicationData);
    this.publicationService.addPublication(publicationData).subscribe(
      (response) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'Publicación creada correctamente!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })
        console.log('Publicación creada correctamente:', response);
        // Aquí podrías redirigir a la página de éxito, por ejemplo
      },
      (error) => {
        console.error('Error al guardar location:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    );
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
