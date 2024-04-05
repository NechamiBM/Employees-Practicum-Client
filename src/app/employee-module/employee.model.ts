import {Role} from "./role.model"

export class Employee {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public identity!: string;
    public startWorkDate!: Date;
    public birthDate!: Date;
    public gender!: Gender;
    public roles!: Role[];
}

export enum Gender {
    Male,
    Female
  }