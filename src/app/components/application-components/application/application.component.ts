import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Application } from 'src/app/interfaces/application.interface';
import { ApplicationService } from 'src/app/services/application.service';
import Swal from 'sweetalert2';


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
    this.router.navigate(['/application-details', application.uuid]);
  }
  showEdit(application: any): void {
    this.router.navigate(['/application-edit', application.uuid]);
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
        if(parseInt(this.numPage, 10) < 1){
          this.numPage = '1';
        }
        // Poner aquí el alert ...
        Swal.fire({
          position: 'center',
          icon: 'info',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'You are in the last page!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })
      }
      else{
        this.filteredApplications = applications;
        if (!this.printeado){
          Swal.fire({
            position: 'center',
            icon: 'success',
            customClass: {
              icon: 'swal-icon-color'
            },
            title: 'Application Loaded',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500,
            backdrop: `
            rgba(0,0,0,0.8)
            `
          })
        }
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
        
        // alert("Estas en la primera pagina");

        // Poner aquí el alert ...
        Swal.fire({
          position: 'center',
          icon: 'info',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'You are in the first page!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })
        return;
      } else {
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        this.printeaTodos();
      }
    }
  }
}
