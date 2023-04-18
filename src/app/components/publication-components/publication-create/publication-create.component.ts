import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicationService } from 'src/app/services/publication.service';

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
      "idUserPublication": ['', Validators.required],
      "photoPublication": ['', Validators.required],
      })
  }

  get f() {
    return this.publicationForm.controls;
  }

  onSubmit(): void {
    if (this.publicationForm.invalid) {
      return;
    }
    this.openModal();
  }

  confirmChanges(): void {
    const publicationData = this.publicationForm.value;
    console.log(publicationData);
    this.publicationService.addPublication(publicationData).subscribe(
      (response) => {
        console.log('Localización guardada correctamente:', response);
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
