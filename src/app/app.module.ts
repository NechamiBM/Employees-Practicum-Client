import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RoleModule } from './modules/role-module/role.module';
import { EmployeeModule } from './modules/employee-module/employee.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, EmployeeModule,RoleModule, BrowserAnimationsModule, NgbModule, HttpClientModule, ReactiveFormsModule,MatDialogModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }