import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './modules/employee-module/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './modules/employee-module/employee-details/employee-details.component';

const APP_ROUTES: Routes = [
  { path: "", redirectTo: "employees", pathMatch: 'full' },
  { path: "employees", component: EmployeeListComponent },
  { path: "addEmployee", component: EmployeeDetailsComponent },
  { path: "**", redirectTo: "employees", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
