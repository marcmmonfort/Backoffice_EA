import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/interfaces/activity.interface';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent {

  activityData!: Activity;
  activityId!: string;
  isModalOpen:boolean=false;
  
  constructor(private route: ActivatedRoute, private activityService: ActivityService,private router:Router) {}

  ngOnInit(): void {
    this.loadActivityData();
  }

  loadActivityData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.activityId = parts[parts.length - 1];
    console.log(this.activityId);
    this.activityService.getActivity(this.activityId).subscribe(activityData=>{
      this.activityData=activityData;
      console.log(this.activityData);
    });
  }

  showResponses(activity:Activity):void{
    this.router.navigate(['activity-details/responses/',activity._id])
  }
  
}