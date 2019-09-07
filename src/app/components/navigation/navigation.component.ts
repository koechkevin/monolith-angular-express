import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpRequestService} from '../../services/http-request.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  constructor(
      private httpRequest: HttpRequestService
  ) { }
  login = {
    password: '',
    email: ''
  };
  modalComponent;
  modal;
  isLoggedIn: boolean;

  ngOnInit() {
    this.httpRequest.getUsers().subscribe(users => console.log(users));
    this.isLoggedIn = !!localStorage.getItem('token');
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
}
