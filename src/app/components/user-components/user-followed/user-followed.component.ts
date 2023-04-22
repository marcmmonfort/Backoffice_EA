import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-followed',
  templateUrl: './user-followed.component.html',
  styleUrls: ['./user-followed.component.css']
})
export class UserFollowedComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  userId!:string;

  constructor(private route: ActivatedRoute,private userService: UserService, private router: Router){}
  ngOnInit(user:any):void{
    this.loadUserData();
  }

  loadUserData(): void{
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.userId = parts[parts.length - 1];
    this.userService.getFollowed(this.userId).subscribe(users=>{
      this.users=users;
    })
  }

  showDetails(user: any): void {
    this.router.navigate(['/user-details', user.id]);
  }
  showEdit(user: any): void {
    this.router.navigate(['/user-edit', user.id]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredUsers = this.users.filter((user) =>
        user.mailUser.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;
    }
  }
}
