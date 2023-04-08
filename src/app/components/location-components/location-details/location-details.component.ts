import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent {
  locData: any;
  locationId!: string;
  isModalOpen:boolean=false;
  
  constructor(private route: ActivatedRoute, private locationService: LocationService,private router:Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.locationId = parts[parts.length - 1];
    console.log(this.locationId);
    this.locationService.getLocation(this.locationId).subscribe(locData=>{
      this.locData=locData;
    });
  }

}
