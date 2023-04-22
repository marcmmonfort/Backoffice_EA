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
  //numPage: string='5'; //PONER ALGUN TIPO DE PÁGINAS PARA QUE AL CAMBIAR DE LA PAGINA 1 A LA 2 SE OBTENGAN LOS COMENTARIOS
  searchTerm: string = '';

  constructor(private applicationService: ApplicationService, private router: Router) {}
  
  ngOnInit(): void {
    this.applicationService.getAllApplication().subscribe(data=> {
      this.applications = data;
    }, error => {
      console.log(error);
    })
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
    } else {
      this.filteredApplications = this.applications;
      console.log(this.filteredApplications);
    }
  }
}
