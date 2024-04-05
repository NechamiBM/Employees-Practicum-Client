import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee, Gender } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  inList: string = "true";

  employees: Employee[] =
    [{ id: 1, firstName: "John", lastName: "Doe", identity: "123456789", startWorkDate: new Date("2022-01-01"), birthDate: new Date("1990-01-01"), gender: Gender.Male, roles: [] },
    { id: 2, firstName: "Jane", lastName: "Smith", identity: "987654321", startWorkDate: new Date("2022-02-01"), birthDate: new Date("1995-03-15"), gender: Gender.Female, roles: [] },
    { id: 3, firstName: "David", lastName: "Johnson", identity: "456789123", startWorkDate: new Date("2022-03-01"), birthDate: new Date("1988-07-20"), gender: Gender.Male, roles: [] },
    { id: 4, firstName: "Emily", lastName: "Brown", identity: "321654987", startWorkDate: new Date("2022-04-01"), birthDate: new Date("1992-09-10"), gender: Gender.Female, roles: [] },
    { id: 5, firstName: "Michael", lastName: "Jones", identity: "654321987", startWorkDate: new Date("2022-05-01"), birthDate: new Date("1985-11-05"), gender: Gender.Male, roles: [] }];

  deleteEmployee(employee: Employee) {
    console.log("delete", employee);
  }

  editEmployee(employee: Employee) {
    console.log("edit", employee);
  }

  constructor(private _employeeService: EmployeeService, private _roleService: RoleService, private _router: Router) {
   }

  ngOnInit(): void {
    // this._employeeService.getEmployees().subscribe(d => { this.employees = d; this.employees2 = d })

  }
}
