import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListUserComponent } from './components/list-user/list-user.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { CommentComponent } from './components/comment-components/comment/comment.component';
import { LocationComponent } from './components/location/location.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserFollowersComponent } from './components/user-followers/user-followers.component';
import { UserFollowedComponent } from './components/user-followed/user-followed.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { CommentEditComponent } from './components/comment-components/comment-edit/comment-edit.component';
import { CommentDetailsComponent } from './components/comment-components/comment-details/comment-details.component';
import { CommentCreateComponent } from './components/comment-components/comment-create/comment-create.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
  { path: 'register', component: RegisterComponent },
  { path: 'log-in', component: LogInComponent },

  //{ path:'comment-details/responses/:id', component:  },
  { path:'user-details/followers/:id',component: UserFollowersComponent },
  { path:'user-details/followed/:id',component: UserFollowedComponent }


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
    RegisterComponent,
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
