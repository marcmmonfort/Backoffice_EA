import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListUserComponent } from './components/user-components/list-user/list-user.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';

import { LocationComponent } from './components/location-components/location/location.component';
import { CommentComponent } from './components/comment-components/comment/comment.component';

import { UserDetailsComponent } from './components/user-components/user-details/user-details.component';
import { UserFollowersComponent } from './components/user-components/user-followers/user-followers.component';
import { UserFollowedComponent } from './components/user-components/user-followed/user-followed.component';
import { UserEditComponent } from './components/user-components/user-edit/user-edit.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { UserCreateComponent } from './components/user-components/user-create/user-create.component';
import { LocationCreateComponent } from './components/location-components/location-create/location-create.component';
import { LocationDetailsComponent } from './components/location-components/location-details/location-details.component';
import { LocationEditComponent } from './components/location-components/location-edit/location-edit.component';

import { LogInComponent } from './components/log-in/log-in.component';
import { CommentEditComponent } from './components/comment-components/comment-edit/comment-edit.component';
import { CommentDetailsComponent } from './components/comment-components/comment-details/comment-details.component';
import { CommentCreateComponent } from './components/comment-components/comment-create/comment-create.component';
import { RegisterComponent } from './components/register/register.component';
import { PublicationComponent } from './components/publication-components/publication/publication.component';
import { PublicationCreateComponent } from './components/publication-components/publication-create/publication-create.component';
import { PublicationDetailsComponent } from './components/publication-components/publication-details/publication-details.component';
import { PublicationEditComponent } from './components/publication-components/publication-edit/publication-edit.component';
import { CommentResponseComponent } from './components/comment-components/comment-response/comment-response.component';
import { ApplicationComponent } from './components/application-components/application/application.component';
import { ApplicationCreateComponent } from './components/application-components/application-create/application-create.component';
import { ApplicationDetailsComponent } from './components/application-components/application-details/application-details.component';
import { ApplicationEditComponent } from './components/application-components/application-edit/application-edit.component';
import { ActivityComponent } from './components/activity-components/activity/activity.component';
import { ActivityCreateComponent } from './components/activity-components/activity-create/activity-create.component';
import { ActivityDetailsComponent } from './components/activity-components/activity-details/activity-details.component';
import { ActivityEditComponent } from './components/activity-components/activity-edit/activity-edit.component';
import { AuthGuard } from './shared/auth.guard';
import { AuthService } from './services/auth.service';
import { ActivityParticipantsComponent } from './components/activity-components/activity-participants/activity-participants.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'listUsers', component: ListUserComponent, canActivate:[AuthGuard] },
  { path: 'app', component: AppComponent, canActivate:[AuthGuard] },
  { path: 'comment', component: CommentComponent, canActivate:[AuthGuard] },
  { path: 'comment-create', component: CommentCreateComponent, canActivate:[AuthGuard] },
  { path: 'comment-details/:id', component: CommentDetailsComponent, canActivate:[AuthGuard] },
  { path: 'comment-edit/:id', component: CommentEditComponent, canActivate:[AuthGuard] },
  { path: 'location', component: LocationComponent, canActivate:[AuthGuard] },
  { path: 'user-details/:id', component: UserDetailsComponent, canActivate:[AuthGuard] },
  { path: 'user-edit/:id', component: UserEditComponent, canActivate:[AuthGuard] },
  { path: 'user-create', component: UserCreateComponent, canActivate:[AuthGuard] },

  { path: 'location-create', component: LocationCreateComponent, canActivate:[AuthGuard] },
  { path: 'location-details/:id', component: LocationDetailsComponent, canActivate:[AuthGuard] },
  { path: 'location-edit/:id', component: LocationEditComponent, canActivate:[AuthGuard] },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LogInComponent },

  { path:'comment-details/responses/:id/:aux', component: CommentResponseComponent, canActivate:[AuthGuard] },
  { path:'user-details/followers/:id',component: UserFollowersComponent, canActivate:[AuthGuard] },
  { path:'user-details/followed/:id',component: UserFollowedComponent, canActivate:[AuthGuard] },
  { path:'publication',component: PublicationComponent, canActivate:[AuthGuard] },
  { path:'publication-create',component: PublicationCreateComponent, canActivate:[AuthGuard] },
  { path:'publication-details/:id',component: PublicationDetailsComponent, canActivate:[AuthGuard] },
  { path:'publication-edit/:id',component: PublicationEditComponent, canActivate:[AuthGuard] },

  { path:'activity',component: ActivityComponent, canActivate:[AuthGuard] },
  { path:'activity-create',component: ActivityCreateComponent, canActivate:[AuthGuard] },
  { path:'activity-details/:id',component: ActivityDetailsComponent, canActivate:[AuthGuard] },
  { path:'activity-edit/:id',component: ActivityEditComponent, canActivate:[AuthGuard] },
  { path:'activity-participants/:id',component: ActivityParticipantsComponent, canActivate:[AuthGuard] },

  { path:'application',component: ApplicationComponent, canActivate:[AuthGuard] },
  { path:'application-create',component: ApplicationCreateComponent, canActivate:[AuthGuard] },
  { path:'application-details/:id',component: ApplicationDetailsComponent, canActivate:[AuthGuard] },
  { path:'application-edit/:id',component: ApplicationEditComponent, canActivate:[AuthGuard] }

];

@NgModule({
  declarations: [
    ListUserComponent,
    NavigationComponent,
    AppComponent,
    HomeComponent,
    CommentComponent,
    CommentCreateComponent,
    CommentDetailsComponent,
    CommentEditComponent,
    CommentResponseComponent,

    
    LogInComponent,
    RegisterComponent,
    
    UserDetailsComponent,
    UserFollowersComponent,
    UserFollowedComponent,
    UserEditComponent,
    ConfirmationModalComponent,
    UserCreateComponent,

    LocationComponent,
    LocationCreateComponent,
    LocationDetailsComponent,
    LocationEditComponent,

    
    PublicationComponent,
    PublicationCreateComponent,
    PublicationDetailsComponent,
    PublicationEditComponent,
    

    ApplicationComponent,
    ApplicationCreateComponent,
    ApplicationDetailsComponent,
    ApplicationEditComponent,
  
    ActivityComponent,
    ActivityCreateComponent,
    ActivityDetailsComponent,
    ActivityEditComponent,
    ActivityParticipantsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
