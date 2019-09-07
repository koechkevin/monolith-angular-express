import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpRequestService} from '../../services/http-request.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  loggedIn: boolean = !!localStorage.getItem('token');
  sub: Subscription;

  constructor(
      private api: HttpRequestService
  ) {
    this.sub = this.api.loggedIn().subscribe(isLogged => {
      this.loggedIn = isLogged;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  save(e) {
    if (e.charCode === 13) {
      console.log(e.target.value);
    }
  }
}
