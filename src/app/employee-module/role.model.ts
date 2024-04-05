import {RoleType} from "./roleType.model"

export class Role {
    employeeId!: number;
    roleTypeId!: number;
    role!: RoleType;
    StartDate!: Date;
    IsAdministrative!:boolean;
}