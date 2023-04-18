import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from 'src/app/interfaces/publication.interface';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-publication-edit',
  templateUrl: './publication-edit.component.html',
  styleUrls: ['./publication-edit.component.css']
})
export class PublicationEditComponent {
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
      console.log(publicationData);
      this.publicationData=publicationData;
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
    this.publicationService.editPublication(this.publicationData, this.publicationId).subscribe(() => {
      this.closeModal();
    });
  }
  onAcceptChanges(): void {
    this.confirmChanges();
  }
  onCancelChanges(): void {
    this.isModalOpen = false;
    this.loadPublicationData();
  }
}
