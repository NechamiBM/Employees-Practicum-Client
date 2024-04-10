import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import * as XLSX from 'xlsx';
import { Employee, Gender } from 'src/models/employee.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  visibility: string;
  searchInput: Subject<string> = new Subject<string>();
  searchText: string = '';

  deleteEmployee(employee: Employee) {
    this._employeeService.deleteEmployee(employee.id).subscribe(() => {
      this.employees = this.employees.filter(e => e.id != employee.id)
    }, err => console.log("err", err))
  }

  editEmployee(employee: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { employee: employee };
    dialogConfig.maxHeight = '95vh';
    dialogConfig.maxWidth = '60vw';
    const dialogRef =  this.dialog.open(EmployeeDetailsComponent, dialogConfig);
    dialogRef.componentInstance.employee = employee;
    console.log("edit", employee);
  }

  filterEmployees() {
    this.searchInput.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(() => this._employeeService.getEmployees(this.searchText)),
    ).subscribe(data => this.employees = data);
  }

  getEmployeeFiltered() {
    this.searchInput.next(this.searchText);
  }

  exportToExcel() {
    this._employeeService.getEmployees().subscribe(data => {
      console.log("data", data);
      const workbook = XLSX.utils.book_new();
      const newData = data.map(emp => ({
        id: emp.id, firstName: emp.firstName, lastName: emp.lastName, identity: emp.identity, startWorkDate: emp.startWorkDate, birthDate: emp.birthDate, gender: Gender[emp.gender]
      }));
      const mainWorksheet = XLSX.utils.json_to_sheet(newData);
      XLSX.utils.book_append_sheet(workbook, mainWorksheet, 'Employee List');
      data.forEach((employee, index) => {
        const rolesData = employee.roles.map(role => ({
          role: role.roleType.name, startDate: role.startDate, isAdministrative: role.isAdministrative
        }));
        const rolesWorksheet = XLSX.utils.json_to_sheet(rolesData);
        XLSX.utils.book_append_sheet(workbook, rolesWorksheet, `${employee.id}_${employee.firstName}_${employee.lastName}_Roles`);
      });
      XLSX.writeFile(workbook, 'employees.xlsx');
    });
  }

  constructor(private _employeeService: EmployeeService,public dialog: MatDialog) { }

  ngOnInit() {
    this._employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
    this.loadFromLocalStorage();
    this.filterEmployees();
  }

  saveToLocalStorage(value: string) {
    localStorage.setItem('visibility', value);
  }

  loadFromLocalStorage() {
    const visibility = localStorage.getItem('visibility');
    if (visibility)
      this.visibility = visibility;
  }
}
