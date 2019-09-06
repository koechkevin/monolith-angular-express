import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from '../../services/http-request.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  login = {
    password: '',
    email: ''
  };
  constructor(
      private httpRequest: HttpRequestService
  ) { }

  ngOnInit() {
    this.httpRequest.getUsers().subscribe(users => console.log(users));
  }


  loginSubmit() {
    this.httpRequest.login(this.login)
        .subscribe((res) => {
          console.log(res);
        });
    this.login = {
      password: '',
      email: ''
    };
  }
}
