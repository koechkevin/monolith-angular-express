import {Component, OnInit} from '@angular/core';
import {HttpRequestService} from '../../services/http-request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  pass  = 'password';
  model = {
  };
constructor(
    private apiCall: HttpRequestService
) { }

  ngOnInit() {
  }

  viewPassword() {
    this.pass = this.pass === 'password' ? 'text' : 'password';
  }

  register() {
    this.apiCall.register(this.model)
        .subscribe(res => {
          document.getElementById('modal').style.display = 'none';
          this.model = {};
          console.log(res);
        });
  }
}
