import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css']
})
export class LocationCreateComponent {
  locForm: FormGroup | any;
  isModalOpen:boolean=false;
  constructor(private formBuilder: FormBuilder, private locationService: LocationService, private router: Router) { }

  ngOnInit(): void {

    this.locForm = this.formBuilder.group({
      nameLocation: ['', Validators.required],
      latLocation: ['', Validators.required],
      lonLocation: ['', Validators.required],
      descriptionLocation: ['', Validators.required],
    });
  }

  get f() {
    return this.locForm.controls;
  }

  onSubmit(): void {
    if (this.locForm.invalid) {
      return;
    }
    this.openModal();
  }
  confirmChanges(): void {
    const locData = this.locForm.value;
    this.locationService.addLocation(locData).subscribe(
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
