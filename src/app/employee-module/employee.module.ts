import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { RoleService } from './role.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeeListComponent, AddEmployeeComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [EmployeeService, RoleService],
  exports: [EmployeeListComponent, AddEmployeeComponent]
})

export class EmployeeModule { }