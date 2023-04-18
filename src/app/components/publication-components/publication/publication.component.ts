import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publication } from 'src/app/interfaces/publication.interface';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit{
  
  publication: Publication[] = [];
  filteredPublications: any[] = [];
  //idPublicationComment: string = 'id';
  //numPage: string='3'; //PONER ALGUN TIPO DE PÁGINAS PARA QUE AL CAMBIAR DE LA PAGINA 1 A LA 2 SE OBTENGAN LOS COMENTARIOS
  searchTerm: string = '';

  constructor(private publicationService: PublicationService, private router: Router) {}

  
  ngOnInit(): void {
    this.publicationService.getAllPublications().subscribe(data=> {
      this.publication = data;
      console.log(this.publication[0].photoPublication[0]);
    }, error => {
      console.log(error);
    })
  }

  showDetails(publication: any): void {
    this.router.navigate(['/publication-details', publication._id]);
  }

  showEdit(publication: any): void {
    this.router.navigate(['/publication-edit', publication._id]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredPublications = this.publication.filter((publication) =>
        publication.createdAt.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredPublications = this.publication;
      console.log(this.filteredPublications);
    }
  }

}
