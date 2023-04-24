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
  numPage: string = '';
  searchTerm: string = '';
  printeado: boolean = false;

  constructor(private activityService: ActivityService, private router: Router) {}

  ngOnInit(): void {
    this.activityService.getAllActivities().subscribe(activities => {
      this.activities = activities;
    }, error => {
      console.log(error);
    })
    this.printeado = false;
    this.numPage="1";
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

  printeaTodos() {
    this.activityService.getAllPaginatedActivities(this.numPage).subscribe((activities) => {
      if(activities.length==0){
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        alert("Ya no hay más comentarios")
      }
      else{
        this.filteredActivities = activities;
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
        alert("Estas en la primera pagina");
        return;
      } else {
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        this.printeaTodos();
      }
    }
  }

}