import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RoleService {

    // getStudentsFromServer(): Observable<Student[]> {
    //     return this._http.get<Student[]>("/api/Students");
    // }

    constructor(private _http: HttpClient) {
    }
}