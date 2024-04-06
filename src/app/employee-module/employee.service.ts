import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService {
    constructor(private _http: HttpClient) { }

    getEmployees(filter?: string): Observable<Employee[]> {
        let params = new HttpParams();
        if (filter)
            params = params.set('filter', filter);
        return this._http.get<Employee[]>("/api/Employee", { params: params });
    }

    getEmployees1(filter: string): Observable<Employee[]> {
        console.log("get in service");
        return this._http.get<Employee[]>("/api/Employee");
    }
}