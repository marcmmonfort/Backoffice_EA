import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/interfaces/activity.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-activity-participants',
  templateUrl: './activity-participants.component.html',
  styleUrls: ['./activity-participants.component.css']
})
export class ActivityParticipantsComponent implements OnInit {
  
  user: User[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  activityId!: string;
  Id!: string;
  numPage: string = '';
  printeado: boolean = false;


  constructor(private activityService: ActivityService, private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.getDatosId();
    this.printeado = false;
    this.numPage="1";
  }
  getDatosId(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.Id = parts[parts.length - 1];
    console.log(this.Id);
  }



  showDetails(comment: any): void {
    this.router.navigate(['/comment-details', comment._id]);
  }
  showEdit(comment: any): void {
    this.router.navigate(['/comment-edit', comment._id]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredUsers = this.user.filter((user) =>
        user.createdAt.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } 
  }

  printeaTodos() {
    this.activityService.getParticipantsOfParticularActivity(this.Id, this.numPage).subscribe((users) => {
      if(users.length==0){
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        alert("Ya no hay más usuarios")
      }
      else{
        this.filteredUsers = users;
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
