import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpRequestService} from '../../services/http-request.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profile: object;
  isEditing: boolean;
  subscription: Subscription;
  constructor(
      private api: HttpRequestService,
      private router: Router
  ) {
    this.subscription = this.api.loggedIn().subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/']);
      }
    }, this.errorHandler);
  }

  ngOnInit() {
    this.api.getProfileData().subscribe(({profile}) => {
      this.profile = profile;
    } , this.errorHandler);
  }

  toggle() {
    this.isEditing = true;
  }

  errorHandler = (error) => {if (error.status === 403) {
      localStorage.removeItem('token');
    }
  }

  cancel() {
    this.isEditing = false;
    this.api.getProfileData().subscribe(({profile}) => {
      this.profile = profile;
    }, this.errorHandler);
  }

  update() {
    this.api.updateProfile(this.profile).subscribe(({profile}) => {
      this.profile = profile;
    }, this.errorHandler);
    this.isEditing = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
