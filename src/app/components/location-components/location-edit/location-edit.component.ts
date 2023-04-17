import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent {
  locData: any;
  locationId!: string;
  isModalOpen:boolean=false;
  isDeleteUp:boolean=false;
  isEditUp:boolean=false;
  
  constructor(private route: ActivatedRoute, private locationService: LocationService,private router:Router) {}

  ngOnInit(): void {
    this.loadLocationData();
  }

  loadLocationData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.locationId = parts[parts.length - 1];
    console.log(this.locationId);
    this.locationService.getLocation(this.locationId).subscribe(locData=>{
      this.locData=locData;
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
      this.locationService.updateLocation(this.locData, this.locationId).subscribe(() => {
        this.closeModal();
        this.router.navigate(['/location']);
      });
      
      if(this.isDeleteUp){
        this.locationService.deleteLocation(this.locationId).subscribe(()=>{
          this.closeModal();
          this.router.navigate(['/location']);
        })
      } 
  }
  onAcceptChanges(): void {
    this.confirmChanges();
  }

  onCancelChanges(): void {
    this.isModalOpen = false;
    this.loadLocationData();
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
