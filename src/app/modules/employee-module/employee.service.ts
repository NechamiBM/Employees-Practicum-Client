import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/models/employee.model';

@Injectable()
export class EmployeeService {
    constructor(private _http: HttpClient) { }

    getEmployees(filter?: string): Observable<Employee[]> {
        let params = new HttpParams();
        if (filter)
            params = params.set('filter', filter);
        return this._http.get<Employee[]>("/api/Employees", { params: params });
    }

    deleteEmployee(id: number) {
        return this._http.delete("/api/Employees/" + id);
    }

    addEmployee(employee: Employee): Observable<void> {
        console.log("add empolyee", employee);
        console.log("add rol", employee.roles);
        return this._http.post<void>("/api/Employees", employee);
    }

    editEmployee(employee: Employee): Observable<any> {
        console.log("edit empolyee", employee);
        // return this._http.post<void>("/api/Employees", employee);
        return this._http.put<any>("/api/Employees/" + employee.id, employee);
    }
}