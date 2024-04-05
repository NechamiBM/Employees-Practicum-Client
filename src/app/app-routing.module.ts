import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-module/employee-list/employee-list.component';
import { AddEmployeeComponent } from './employee-module/add-employee/add-employee.component';

const APP_ROUTES: Routes = [
  { path: "", redirectTo: "employeeList", pathMatch: 'full' },
  { path: "employeeList", component: EmployeeListComponent },
  { path: "addEmployee", component: AddEmployeeComponent },
  { path: "**", redirectTo: "employeeList", pathMatch: 'full' }

  // { path: "detailes", component: ShowEmployeeComponent },
  // { path: "edit", component: AddEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
