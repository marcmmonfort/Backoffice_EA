import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activity.service';
import { ApplicationService } from 'src/app/services/application.service';
import { CommentService } from 'src/app/services/comment.service';
import { LocationService } from 'src/app/services/location.service';
import { PublicationService } from 'src/app/services/publication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  
  activityCount:string="0";
  applicationCount:string="0";
  commentCount:string="0";
  locationCount:string="0";
  publicationCount:string="0";
  userCount:string="0";

  constructor(private route: ActivatedRoute, private publicationService: PublicationService,private applicationService:ApplicationService,private activityService:ActivityService,private commentService:CommentService,private locationService:LocationService,private userService:UserService,private router:Router) {}

  ngOnInit(){
    this.locationService.getCountLocation().subscribe((locations) => {
      this.locationCount=locations;
    });
    this.publicationService.getCountPublication().subscribe((publications)=>{
      this.publicationCount=publications;
    });
    this.applicationService.getCountApplication().subscribe((applications)=>{
      this.applicationCount=applications;
    });
    this.activityService.getCountActivity().subscribe((activities)=>{
      this.activityCount=activities;
    });
    this.userService.getCountUser().subscribe((users)=>{
      this.userCount=users;
    });
    this.commentService.getCountComment().subscribe((comments)=>{
      this.commentCount=comments;
    });
    
  }
  
}
