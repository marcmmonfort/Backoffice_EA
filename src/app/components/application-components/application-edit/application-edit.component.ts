import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/interfaces/application.interface';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-application-edit',
  templateUrl: './application-edit.component.html',
  styleUrls: ['./application-edit.component.css']
})
export class ApplicationEditComponent {

  applicationData!: Application;
  applicationId!: string;
  isModalOpen:boolean=false;
  
  constructor(private route: ActivatedRoute, private applicationService: ApplicationService,private router:Router) {}

  ngOnInit(): void {
    this.loadApplicationData();
  }

  loadApplicationData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.applicationId = parts[parts.length - 1];
    console.log(this.applicationId);
    this.applicationService.getApplication(this.applicationId).subscribe(applicationData=>{
      console.log(applicationData);
      this.applicationData=applicationData;
    });
  }

  onSubmit():void{
    this.openModal();
  }
  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }
  confirmChanges(): void {
    this.applicationService.editApplication(this.applicationData, this.applicationId).subscribe(() => {
      this.closeModal();
    });
  }
  onAcceptChanges(): void {
    this.confirmChanges();
  }
  onCancelChanges(): void {
    this.isModalOpen = false;
    this.loadApplicationData();
  }
  
}
