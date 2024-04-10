import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleType } from 'src/models/roleType.model';
import { Observable } from 'rxjs';

@Injectable()
export class RoleService {
    addRole(role: string) {
        return this._http.post("/api/Roles", { name: role });
    }

    getRoles():Observable<RoleType[]>{
        return this._http.get<RoleType[]>("/api/Roles");
    }

    constructor(private _http: HttpClient) { }
}