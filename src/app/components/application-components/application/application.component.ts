import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/interfaces/application.interface';
import { ApplicationService } from 'src/app/services/application.service';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  applications: Application[] = [];
  filteredApplications: any[] = [];
  //idPublicationComment: string = 'id';
  numPage: string = '';
  searchTerm: string = '';
  printeado: boolean = false;

  constructor(private applicationService: ApplicationService, private router: Router) {}
  
  ngOnInit(): void {
    this.applicationService.getAllApplication().subscribe(data=> {
      this.applications = data;
    }, error => {
      console.log(error);
    })
    this.printeado = false;
    this.numPage="1";
  }

  showDetails(application: any): void {
    this.router.navigate(['/application-details', application._id]);
  }
  showEdit(application: any): void {
    this.router.navigate(['/application-edit', application._id]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredApplications = this.applications.filter((application) =>
      application.createdAt.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  printeaTodos() {
    this.applicationService.getAllPaginatedApplications(this.numPage).subscribe((applications) => {
      if(applications.length==0){
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        alert("Ya no hay más notificaciones");
      }
      else{
        this.filteredApplications = applications;
        this.printeado = true;
      }
    });
  }
  paginatenext() {
    if (this.printeado) {
      this.numPage = (parseInt(this.numPage, 10) + 1).toString();
      this.printeaTodos();
    }
  }
  paginateprevious() {
    if (this.printeado) {
      if (this.numPage == '1') {
        alert("Estas en la primera pagina");
        return;
      } else {
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        this.printeaTodos();
      }
    }
  }
}
