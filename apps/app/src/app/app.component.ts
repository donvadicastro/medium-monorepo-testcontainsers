import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.type';

@Component({
  selector: 'testcontainers-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users$ = this.http.get<User[]>('/api/users');
  constructor(private http: HttpClient) {}
}
