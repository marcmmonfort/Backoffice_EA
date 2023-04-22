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
  isDeleteUp:boolean=false;
  isEditUp:boolean=false;
  
  
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
    this.isDeleteUp = false;
    this.isEditUp = false;
  }

  confirmChanges(): void {
    this.applicationService.editApplication(this.applicationData, this.applicationId).subscribe(() => {
      this.closeModal();
      this.router.navigate(['/application']);
    });

    if(this.isDeleteUp){
      this.applicationService.deleteApplication(this.applicationId).subscribe(()=>{
        this.closeModal();
        this.router.navigate(['/application']);
      })
    } 

  }
  onAcceptChanges(): void {
    this.confirmChanges();
  }
  onCancelChanges(): void {
    this.isModalOpen = false;
    this.loadApplicationData();
  }

  eliminar(){
    this.isDeleteUp=true;
    this.openModal();
  }
  editar(){
    this.isEditUp=true;
    this.openModal();
  }
  
}
