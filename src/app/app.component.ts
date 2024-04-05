import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Employees - Management';
  data = {
    email: 'n7110315@gmail.com',
    subject: "פרויקט אתר לניהול עובדים"
  }

  sendEmail() {
    window.location.href = `mailto:${this.data.email}?subject=${encodeURIComponent(this.data.subject)}`;
  }
}
