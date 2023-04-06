import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  users: any[] = [];
  constructor(private userService: UserService, private router: Router){};
  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users;
      });
  }

  showDetails(user: any): void {
    this.router.navigate(['/user-details', user.id]);
  }
  showEdit(user: any): void {
    this.router.navigate(['/user-edit', user.id]);
  }
}
