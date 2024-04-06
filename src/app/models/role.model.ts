import {RoleType} from "./roleType.model"

export class Role {
    employeeId: number;
    roleType: RoleType;
    startDate: Date;
    isAdministrative:boolean;
}