import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleType } from '../models/roleType.model';

@Injectable()
export class RoleService {
    addRole(role: RoleType) {
        return this._http.post("/api/Roles", role);
    }
    constructor(private _http: HttpClient) { }
}