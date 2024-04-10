import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../role.service';
import { RoleType } from 'src/models/roleType.model';

@Component({
  selector: 'add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  name: string = '';

  constructor(public dialogRef: MatDialogRef<AddRoleComponent>, private _roleService: RoleService) { }

  confirm() {
    this._roleService.addRole(this.name).subscribe();
    this.dialogRef.close(this.name);
  }

  cancel() {
    this.dialogRef.close();
  }
}
