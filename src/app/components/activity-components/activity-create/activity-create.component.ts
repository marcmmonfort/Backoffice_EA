import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity } from 'src/app/interfaces/activity.interface';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css']
})
export class ActivityCreateComponent {

  activityForm: FormGroup;
  isModalOpen:boolean=false;
  constructor(private formBuilder: FormBuilder, private activityService: ActivityService, private router: Router) { 
    
    this.activityForm = this.formBuilder.group({
      "nameActivity": ['', Validators.required],
      "creatorActivity": ['', Validators.required],
      "dateActivity": ['', Validators.required],
      "hoursActivity": this.formBuilder.array([this.formBuilder.control(''), Validators.required]),
      "idLocation": [''], // Optional.
      "descriptionActivity": [''], // Optional.
      "privacyActivity": [false, Validators.required],
      "roleActivity": ['', Validators.required],   
      })
  }

  get f() {
    return this.activityForm.controls;
  }

  saveHours() {
    const startHour = (<HTMLInputElement>document.getElementById("start")).value;
    const endHour = (<HTMLInputElement>document.getElementById("end")).value;
    const hoursActivity = [startHour, endHour];
    this.activityForm.controls['hoursActivity'].setValue(hoursActivity);
  }

  onSubmit(): void {
    console.log(this.activityForm.value);
    if (this.activityForm.invalid) {
      alert('Por favor, completa todos los campos requeridos')
      this.router.navigate(['/activity']);
    }
    this.openModal();
  
  }

  confirmChanges(): void {

    const activityData = this.activityForm.value;
    console.log(activityData);
    this.activityService.addActivity(activityData).subscribe(
      (response) => {
        console.log('Actividad guardada correctamente:', response);
        // Aquí podrías redirigir a la página de éxito, por ejemplo
      },
      (error) => {
        console.error('Error al guardar la actividad:', error);
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