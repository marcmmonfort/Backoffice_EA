import { KnownService } from 'src/app/services/known.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userKnown:boolean=false;

  constructor(private knownService:KnownService){}

  ngOnInit(): void {
    this.knownService.getUserKnown().subscribe(userKnown => {
      this.userKnown = userKnown;
    });
  }

  LogOut(): void{
    this.knownService.updateUserKnown(false);
  }

  
}