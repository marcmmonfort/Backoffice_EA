import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/interfaces/application.interface';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css']
})
export class ApplicationDetailsComponent {

  applicationData!: Application;
  applicationId!: string;
  isModalOpen:boolean=false;
  
  constructor(private route: ActivatedRoute, private applicationtService: ApplicationService,private router:Router) {}

  ngOnInit(): void {
    this.loadApplicationData();
  }

  loadApplicationData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.applicationId = parts[parts.length - 1];
    console.log(this.applicationId);
    this.applicationtService.getApplication(this.applicationId).subscribe(applicationData=>{
      this.applicationData=applicationData;
      console.log(applicationData);
    });
  }

}
