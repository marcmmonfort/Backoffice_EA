import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  locations: any[] = [];
  filteredLocations: any[] = [];
  searchTerm: string = '';
  numPage: string = '1';
  printeado: boolean = false;
  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe((locations) => {
      this.locations = locations;
    });
    this.printeado = false;
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
      this.filteredLocations = locations;
      this.printeado = true;
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
        return;
      } else {
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        this.printeaTodos();
      }
    }
  }
}
