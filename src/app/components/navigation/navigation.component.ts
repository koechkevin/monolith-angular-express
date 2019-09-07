import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpRequestService} from '../../services/http-request.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  constructor(
      private httpRequest: HttpRequestService,
  ) { }
  login = {
    password: '',
    email: ''
  };
  modalComponent;
  modal;
  isLoggedIn: boolean;
  subscription: Subscription;

  ngOnInit() {
    this.subscription = this.httpRequest.loggedIn().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
    document.addEventListener('click', (e) => {
      const modal = document.getElementById('modal');
      this.modal = modal;
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  ngOnDestroy() {
    document.removeEventListener('click', () => {});
    this.subscription.unsubscribe();
  }


  loginSubmit() {
    this.httpRequest.login(this.login)
        .subscribe((res) => {
          localStorage.setItem('token', res.token);
          this.isLoggedIn = true;
        });
    this.login = {
      password: '',
      email: ''
    };
  }

  closeModal() {
    this.modal.style.display = 'none';
  }

  openRegister() {
    this.modalComponent = 'register';
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
  }
}
