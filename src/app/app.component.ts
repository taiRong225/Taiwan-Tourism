import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Taiwan-Tourism';

  constructor(private authService: AuthService){

  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.authService.getAuthorizationHeader().subscribe(data => {
        this.authService.setAuth(data.access_token);
      });
    } else {
      console.log('isLoggedIn');
    }
  }
}
