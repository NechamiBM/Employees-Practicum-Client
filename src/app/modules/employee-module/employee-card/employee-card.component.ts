import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from 'src/models/employee.model';

@Component({
  selector: 'employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent {

  @Input()
  employee: Employee;

  @Output()
  onDeleteEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();

  @Output()
  onEditEmployee: EventEmitter<Employee> = new EventEmitter<Employee>();

  deleteEmployee() {
    this.onDeleteEmployee.emit(this.employee);
  }

  editEmployee() {
    this.onEditEmployee.emit(this.employee);
  }

}
