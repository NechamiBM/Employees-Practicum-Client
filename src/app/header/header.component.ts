import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog'; 
import { Component, Input } from '@angular/core';
import { AddRoleComponent } from '../role-module/add-role/add-role.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) { }

  title = 'Employees - Management';

  addRole() {
    this.dialog.open(AddRoleComponent);
  }

}
