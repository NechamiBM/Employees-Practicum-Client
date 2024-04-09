import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';

@Component({
  selector: 'employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent {

  @Input()
  employees: Employee[];

  @Output()
  onDeleteEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();

  @Output()
  onEditEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();

  deleteEmployee(employee: Employee) {
    this.onDeleteEmployee.emit(employee);
  }

  editEmployee(employee: Employee) {
    this.onEditEmployee.emit(employee);
  }

}
