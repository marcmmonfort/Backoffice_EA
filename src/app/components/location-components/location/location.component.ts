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
  constructor(private locationService: LocationService, private router: Router) {}
  ngOnInit(): void {
    this.locationService.getLocations().subscribe((locations) => {
      this.locations = locations;
    });
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
        location.nameLocation.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredLocations = this.locations;
    }
  }
}
