import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angulartitle';

  constructor(private authService: AuthService, private titleService: Title) {}

  openSidenav = false;

  ngOnInit() {
    this.authService.initAuthListener();
    this.setDocTitle('Angular Fitness');
  }

  setDocTitle(title: string) {
    console.log('current title:::::' + this.titleService.getTitle());
    this.titleService.setTitle(title);
  }
}
