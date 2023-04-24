import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Activity } from 'src/app/interfaces/activity.interface';
import { ActivityService } from 'src/app/services/activity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit{
  
  activities: Activity[] = [];
  filteredActivities: any[] = [];
  searchTerm: string = '';

  constructor(private activityService: ActivityService, private router: Router) {}

  ngOnInit(): void {
    this.activityService.getAllActivities().subscribe(data=> {
      this.activities = data;
    }, error => {
      console.log(error);
    })
  }

  showDetails(activity: any): void {
    this.router.navigate(['/activity-details', activity._id]);
  }
  showEdit(activity: any): void {
    this.router.navigate(['/activity-edit', activity._id]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredActivities = this.activities.filter((activity) =>
        activity.createdAt.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } 
  }

}