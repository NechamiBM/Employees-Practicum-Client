import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RoleService } from '../role-module/role.service';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeTableComponent, EmployeeCardComponent, EmployeeDetailsComponent],
  imports: [CommonModule, BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [EmployeeService,RoleService],
  exports: [EmployeeListComponent, EmployeeDetailsComponent]
})

export class EmployeeModule { }