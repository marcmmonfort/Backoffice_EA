import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListUserComponent } from './components/list-user/list-user.component';
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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'listUsers', component: ListUserComponent },
  { path: 'app', component: AppComponent },
  { path: 'comment', component: CommentComponent },
  { path: 'comment-create', component: CommentCreateComponent },
  { path: 'comment-details/:id', component: CommentDetailsComponent },
  { path: 'comment-edit/:id', component: CommentEditComponent },
  { path: 'location', component: LocationComponent },
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: 'user-edit/:id', component: UserEditComponent },
  { path: 'user-create', component: UserCreateComponent },

  { path: 'location-create', component: LocationCreateComponent },
  { path: 'location-details/:id', component: LocationDetailsComponent },
  { path: 'location-edit/:id', component: LocationEditComponent },

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LogInComponent },

  { path:'comment-details/responses/:id', component: CommentResponseComponent },
  { path:'user-details/followers/:id',component: UserFollowersComponent },
  { path:'user-details/followed/:id',component: UserFollowedComponent },
  { path:'publication',component: PublicationComponent },
  { path:'publication-create',component: PublicationCreateComponent },
  { path:'publication-details/:id',component: PublicationDetailsComponent },
  { path:'publication-edit/:id',component: PublicationEditComponent }




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
    LocationComponent,
    LogInComponent,
    UserDetailsComponent,
    UserFollowersComponent,
    UserFollowedComponent,
    UserEditComponent,
    ConfirmationModalComponent,
    UserCreateComponent,

    LocationCreateComponent,
    LocationDetailsComponent,
    LocationEditComponent,

    RegisterComponent,
    PublicationComponent,
    PublicationCreateComponent,
    PublicationDetailsComponent,
    PublicationEditComponent,
    CommentResponseComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
