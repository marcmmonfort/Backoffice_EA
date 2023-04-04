import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
//import { LogInComponent } from './components/log-in/log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListUserComponent } from './components/list-user/list-user.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './home/app.component';

const routes: Routes = [
  //{ path: '', component: AppComponent },
  { path: 'listUsers', component: ListUserComponent }
];

@NgModule({
  declarations: [
    ListUserComponent,
    AppComponent,
    //NavigationComponent,
    //ListUserComponent,
    //LogInComponent
  ],
  
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    FormsModule, //La he añadido por el tutorial
    ReactiveFormsModule //La he añadido por el tutorial
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
