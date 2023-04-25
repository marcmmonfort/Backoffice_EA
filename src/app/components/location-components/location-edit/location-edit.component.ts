import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';
import Swal from 'sweetalert2';
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
        this.closeModal();
        this.locationService.deleteLocation(this.locationId).subscribe( 
          
          (data:any)=>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              customClass: {
                icon: 'swal-icon-color'
              },
              title: 'Delete succesful!',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1500,
              backdrop: `
              rgba(0,0,0,0.8)
              `
            });


          
            this.router.navigate(['/location']);
          },(error:any)=>{
            console.log(error.status);
    
            switch (error.status) {
              case 401:
                  // Poner aquí el alert ...
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    customClass: {
                      icon: 'swal-icon-color'
                    },
                    title: 'NO_TIENES_UN_JWT_VALIDO!',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 1500,
                    backdrop: `
                    rgba(0,0,0,0.8)
                    `
                  })
                break;
              case 402:
                  // Poner aquí el alert ...
                  Swal.fire({
                    position: 'center',
                    icon: 'error',
                    customClass: {
                      icon: 'swal-icon-color'
                    },
                    title: 'You are not an admin!',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 1500,
                    backdrop: `
                    rgba(0,0,0,0.8)
                    `
                  })
                break; 
              default: 
                // Poner aquí el alert ...
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  customClass: {
                    icon: 'swal-icon-color'
                  },
                  title: 'ERROR!',
                  showConfirmButton: false,
                  timerProgressBar: true,
                  timer: 1500,
                  backdrop: `
                  rgba(0,0,0,0.8)
                  `
                })
              }
        })  
      } 
  }

  onAcceptChanges(): void {
    this.confirmChanges();
  }

  onCancelChanges(): void {
    this.closeModal();
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
