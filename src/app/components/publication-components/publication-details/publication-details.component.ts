import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from 'src/app/interfaces/publication.interface';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publication-details',
  templateUrl: './publication-details.component.html',
  styleUrls: ['./publication-details.component.css']
})
export class PublicationDetailsComponent {

  publicationData!: Publication;
  publicationId!: string;
  isModalOpen:boolean=false;
  
  constructor(private route: ActivatedRoute, private publicationService: PublicationService,private router:Router) {}

  ngOnInit(): void {
    this.loadPublicationData();
  }
  loadPublicationData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.publicationId = parts[parts.length - 1];
    console.log(this.publicationId);
    this.publicationService.getPublication(this.publicationId).subscribe(publicationData=>{
      this.publicationData=publicationData;
      console.log(publicationData);
    });
  }

  showResponses(publication:Publication):void{
    this.router.navigate(['publication-details/responses/',publication._id]);
  }

  showPhoto(publication:Publication):void{
    this.router.navigate(['publication-details/photo/',publication.photoPublication]);
  }

}
