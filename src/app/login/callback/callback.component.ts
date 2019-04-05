import { AuthenticationService } from './../../core/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.handleAuthentication();
  }

}
