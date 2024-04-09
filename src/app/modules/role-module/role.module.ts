import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RoleService } from '../role-module/role.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRoleComponent } from './add-role/add-role.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AddRoleComponent],
  imports: [CommonModule, BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule,MatDialogModule ],
  providers: [RoleService],
  exports: [AddRoleComponent]
})

export class RoleModule { }