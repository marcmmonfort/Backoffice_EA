import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  locations: any[] = [];
  filteredLocations: any[] = [];
  searchTerm: string = '';
  numPage: string = '';
  printeado: boolean = false;
  
  constructor(private locationService: LocationService, private router: Router) {}
  
  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe((locations) => {
      this.locations = locations;
    });
    this.printeado = false;
    this.numPage="1";
  }

  showDetails(location: any): void {
    this.router.navigate(['/location-details', location.id]);
  }
  showEdit(location: any): void {
    this.router.navigate(['/location-edit', location.id]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredLocations = this.locations.filter((location) =>
        location.nameLocation
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    } 
  }
  printeaTodos() {
    this.locationService.getLocations(this.numPage).subscribe((locations) => {
      if(locations.length==0){
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        
        // alert("Ya no hay más localizaciones")

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
        this.filteredLocations = locations;
        if (!this.printeado){
          Swal.fire({
            position: 'center',
            icon: 'success',
            customClass: {
              icon: 'swal-icon-color'
            },
            title: 'Locations Loaded',
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
