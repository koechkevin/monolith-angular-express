import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [{
  path: 'profile', component: ProfileComponent
}, {
  path: '', component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
