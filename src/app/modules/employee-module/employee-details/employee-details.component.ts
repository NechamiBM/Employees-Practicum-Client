import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee, Gender } from 'src/app/models/employee.model';
import { Role } from 'src/app/models/role.model';
import { RoleType } from 'src/app/models/roleType.model';
import { RoleService } from '../../role-module/role.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {

  employeeForm: FormGroup;

  @Input()
  employee?: Employee;

  genders: Gender[] = [Gender.Male, Gender.Female];
  roleTypes: RoleType[];

  constructor(private _roleService: RoleService, private _employeeService: EmployeeService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this._roleService.getRoles().subscribe(data => {
      this.roleTypes = data;
    })
  }

  initForm() {
    this.employeeForm = new FormGroup({
      firstName: new FormControl(this.employee?.firstName, [Validators.required]),
      lastName: new FormControl(this.employee?.lastName, [Validators.required]),
      identity: new FormControl(this.employee?.identity, Validators.required),
      startWorkDate: new FormControl(this.employee?.startWorkDate, Validators.required),
      birthDate: new FormControl(this.employee?.birthDate, Validators.required),
      gender: new FormControl(this.employee?.gender, Validators.required),
      roles: this._formBuilder.array(this.initRoles())
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
      startDate: new FormControl(role?.startDate, Validators.required),
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
    if (this.employeeForm.valid) {
      const roles: Role[] = this.employeeForm.value.roles.map((role: Role) => {
        return { roleTypeId: 2, startDate: new Date(role.startDate), isAdministrative: role.isAdministrative ? role.isAdministrative : false };
      });
      const employee: Employee = {
        id: this.employeeForm.value.id,
        firstName: this.employeeForm.value.firstName,
        lastName: this.employeeForm.value.lastName,
        identity: this.employeeForm.value.identity,
        startWorkDate: new Date(this.employeeForm.value.startWorkDate),
        birthDate: new Date(this.employeeForm.value.birthDate),
        gender: parseInt(this.employeeForm.value.gender),
        roles: roles
      };
      console.log("employee", employee);
      this._employeeService.addEmployee(employee).subscribe();
    }
  }


  // private createEmployeeForm(): void {
  //   this.employeeForm = new FormGroup({
  //     firstName: new FormControl(this.employee?.firstName, [Validators.required]),
  //     lastName: new FormControl(this.employee?.lastName, [Validators.required]),
  //     identity: new FormControl(this.employee ?.identity , Validators.required),
  //     startWorkDate: new FormControl(this.employee ?.startWorkDate , Validators.required),
  //     birthDate: new FormControl(this.employee ?.birthDate , Validators.required),
  //     gender: new FormControl(this.employee ?.gender , Validators.required),
  //   });
  // }

}
