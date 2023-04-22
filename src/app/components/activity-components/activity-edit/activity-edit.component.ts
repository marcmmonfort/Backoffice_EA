import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/interfaces/activity.interface';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activity-edit',
  templateUrl: './activity-edit.component.html',
  styleUrls: ['./activity-edit.component.css']
})
export class ActivityEditComponent {

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
      console.log(activityData);
      this.activityData=activityData;
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
    this.activityService.editActivity(this.activityData, this.activityId).subscribe(() => {
      this.closeModal();
    });
  }
  onAcceptChanges(): void {
    this.confirmChanges();
  }
  onCancelChanges(): void {
    this.isModalOpen = false;
    this.loadActivityData();
  }

}