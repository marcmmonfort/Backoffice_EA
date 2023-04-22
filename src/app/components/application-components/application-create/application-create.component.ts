import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-application-create',
  templateUrl: './application-create.component.html',
  styleUrls: ['./application-create.component.css']
})
export class ApplicationCreateComponent {

  applicationForm: FormGroup | any;
  isModalOpen:boolean=false;
  constructor(private formBuilder: FormBuilder, private applicationService: ApplicationService, private router: Router) { 
    
    this.applicationForm = this.formBuilder.group({
      "idSender": ['', Validators.required],
      "idReceiver": ['', Validators.required],
      "typeApplication": ['', Validators.required],
      "idActivity": ['', Validators.required],
      "descriptionApplication": ['', Validators.required]
      })
  }

  get f() {
    return this.applicationForm.controls;
  }

  onSubmit(): void {
    if (this.applicationForm.invalid) {
      return;
    }
    this.openModal();
  }
  confirmChanges(): void {
    const applicationData = this.applicationForm.value;
    console.log(applicationData);
    this.applicationService.addApplication(applicationData).subscribe(
      (response: any) => {
        console.log('Notificación guardada correctamente:', response);
      },
      (error: any) => {
        console.error('Error al guardar notificación:', error);
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
