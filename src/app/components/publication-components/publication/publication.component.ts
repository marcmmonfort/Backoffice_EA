import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from 'src/app/interfaces/publication.interface';
import { PublicationService } from 'src/app/services/publication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit{
  
  publication: Publication[] = [];
  filteredPublications: any[] = [];
  //idPublicationComment: string = 'id';
  numPage: string = '';
  searchTerm: string = '';
  printeado: boolean = false;

  constructor(private publicationService: PublicationService, private router: Router) {}

  
  ngOnInit(): void {
    this.publicationService.getAllPublications().subscribe(data=> {
      this.publication = data;
      console.log(this.publication[0].photoPublication[0]);
    }, error => {
      console.log(error);
    })
    this.printeado = false;
    this.numPage="1";
  }

  showDetails(publication: any): void {
    this.router.navigate(['/publication-details', publication.uuid]);
  }

  showEdit(publication: any): void {
    this.router.navigate(['/publication-edit', publication.uuid]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredPublications = this.publication.filter((publication) =>
        publication.createdAt.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } 
  }

  printeaTodos() {
    this.publicationService.getNumPublications(this.numPage).subscribe((publication) => {
      if(publication.length==0){
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
        this.filteredPublications = publication;
        if (!this.printeado){
          Swal.fire({
            position: 'center',
            icon: 'success',
            customClass: {
              icon: 'swal-icon-color'
            },
            title: 'Publication Loaded',
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
