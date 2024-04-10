import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { AddRoleComponent } from '../modules/role-module/add-role/add-role.component';
import { EmployeeDetailsComponent } from '../modules/employee-module/employee-details/employee-details.component';

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

  addEmployee() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '95vh';
    dialogConfig.maxWidth = '60vw';
    this.dialog.open(EmployeeDetailsComponent, dialogConfig);
  }
}
