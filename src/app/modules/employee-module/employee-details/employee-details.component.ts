import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Employee, Gender } from 'src/models/employee.model';
import { Role } from 'src/models/role.model';
import { RoleType } from 'src/models/roleType.model';
import { RoleService } from '../../role-module/role.service';
import { EmployeeService } from '../employee.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {

  employeeForm: FormGroup;

  @Input()
  employee?: Employee;

  formSubmitted: boolean = false;

  genders: Gender[] = [Gender.Male, Gender.Female];

  roleTypes: RoleType[];

  constructor(private _roleService: RoleService, private _employeeService: EmployeeService, private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<EmployeeDetailsComponent>) { }

  ngOnInit(): void {
    this.initForm();
    this._roleService.getRoles().subscribe(data => {
      this.roleTypes = data;
    });
    const rolesArray = this.employeeForm.get('roles') as FormArray;
    rolesArray.setValidators(this.uniqueRoleIdValidator());
  }

  initForm() {
    this.employeeForm = new FormGroup({
      firstName: new FormControl(this.employee?.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      lastName: new FormControl(this.employee?.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      identity: new FormControl(this.employee?.identity, [Validators.required, Validators.pattern(/^\d{9}$/)]),
      startWorkDate: new FormControl(this.employee?.startWorkDate, [Validators.required, this.startDateValidator]),
      birthDate: new FormControl(this.employee?.birthDate, [Validators.required, this.birthDateValidator]),
      gender: new FormControl(this.employee?.gender, Validators.required),
      roles: this._formBuilder.array(this.initRoles() || [])
    });
  }

  initRoles() {
    if (this.employee && this.employee.roles)
      return this.employee.roles.map(role => this.createRoleFormGroup(role));
    return [this.createRoleFormGroup()];
  }

  createRoleFormGroup(role?: Role): FormGroup {
    return this._formBuilder.group({
      roleType: new FormControl(role?.roleType, Validators.required),
      startDate: new FormControl(role?.startDate, [Validators.required, this.roleStartDateValidator]),
      isAdministrative: new FormControl(role?.isAdministrative)
    });
  }

  addRole() {
    const roles = this.employeeForm.get('roles') as FormArray;
    roles.push(this.createRoleFormGroup());
  }

  removeRole(index: number) {
    const roles = this.employeeForm.get('roles') as FormArray;
    roles.removeAt(index);
  }

  saveEmployee() {
    this.formSubmitted = true;
    if (this.employeeForm.valid) {
      const roles: Role[] = this.employeeForm.value.roles.map((role: Role) => {
        return { roleTypeId: Number(role.roleType) || role.roleType.id, startDate: new Date(role.startDate), isAdministrative: role.isAdministrative ? role.isAdministrative : false };
      });
      const employee: Employee = {
        id: this.employee?.id ? this.employee.id : 0,
        firstName: this.employeeForm.value.firstName,
        lastName: this.employeeForm.value.lastName,
        identity: this.employeeForm.value.identity,
        startWorkDate: new Date(this.employeeForm.value.startWorkDate),
        birthDate: new Date(this.employeeForm.value.birthDate),
        gender: parseInt(this.employeeForm.value.gender),
        roles: roles
      };
      this.addOrEdit(employee).subscribe({
        next: () => {
          this.dialogRef.close();
          window.location.reload();
        }, error: err => {
          let error = "";
          if (err instanceof HttpErrorResponse && err.error && err.error.errors)
            for (const fieldName in err.error.errors)
              if (err.error.errors.hasOwnProperty(fieldName))
                error = fieldName + ': ' + err.error.errors[fieldName];
          Swal.fire({ icon: "error", title: "Oops...", text: "saving had failed\n" + error });
        }
      });
    }
  }

  addOrEdit(employee: Employee) {
    if (employee.id == 0)
      return this._employeeService.addEmployee(employee);
    return this._employeeService.editEmployee(employee);
  }

  close() {
    this.dialogRef.close();
  }

  isInvalid(controlName: string) {
    const control = this.employeeForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched || this.formSubmitted);
  }

  isValid(controlName: string) {
    const control = this.employeeForm.get(controlName);
    return control && control.valid && control.dirty;
  }

  startDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const currentDate = new Date();
    const controlDate = new Date(control.value);
    return controlDate > currentDate ? { 'startDate': true } : null;
  }

  birthDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const currentDate = new Date();
    const birthDate = new Date(control.value);
    const minBirthDate = new Date(currentDate.getFullYear() - 16, currentDate.getMonth(), currentDate.getDate());
    return birthDate > minBirthDate ? { 'minAge': true } : null;
  }

  roleStartDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const startWorkDateControl = control.root.get('startWorkDate');
    const roleStartDate = control.value;
    return (roleStartDate && startWorkDateControl && new Date(roleStartDate) >= new Date(startWorkDateControl.value)) ? null : { 'roleStartDateInvalid': true };
  }

  uniqueRoleIdValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const rolesArray = control as FormArray;
      var roleIds = rolesArray.controls.map((roleControl) => { return roleControl.get('roleType').value });
      roleIds = roleIds.filter(x => x != "");
      const isDuplicate = roleIds.some((roleId, index) => roleIds.indexOf(roleId) != index);
      return isDuplicate ? { duplicateRoleId: true } : null;
    };
  }

}
