import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/interfaces/activity.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ActivityService } from 'src/app/services/activity.service';
import Swal from 'sweetalert2';

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
        if(parseInt(this.numPage, 10) < 1){
          this.numPage = '1';
        }
        // Poner aquí el alert ...
        Swal.fire({
          position: 'center',
          icon: 'info',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'There are not more comments!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })
      }
      else{
        this.filteredUsers = users;
        if (!this.printeado){
          Swal.fire({
            position: 'center',
            icon: 'success',
            customClass: {
              icon: 'swal-icon-color'
            },
            title: 'Participants Loaded',
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
