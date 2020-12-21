import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Test } from '../tests/test'

@Injectable()
export class DataServiceTest {
    
    constructor(private _http: HttpClient) {}

    readonly PATH = "http://localhost:8080/output_field"

    public allTests: Test[] = [];
    private tests = new BehaviorSubject<Test[]>(null);
    public currentTests: Observable<Test[]> = this.tests.asObservable();

    private get_project_id = new BehaviorSubject<number>(null);
    current_get_project_id = this.get_project_id.asObservable();

    private delete_project_id = new BehaviorSubject<number>(null);
    current_delete_project_id = this.delete_project_id.asObservable();

    public allNewTests: Test[] = [];
    private newTests = new BehaviorSubject<Test[]>(null);
    public currentNewTests: Observable<Test[]> = this.newTests.asObservable();

    public setIdToGet(id: number) {
        this.get_project_id.next(id);           
    }

    public getTestsByProjectId(): void {
        this.findAllByProjectId()
        .toPromise().then(data => {                  
            this.tests.next(data);
            this.allTests = data;
        });
    }

    private findAllByProjectId(): Observable<any> {
        return this._http.get<Test[]>(`${this.PATH}/project_id/${this.get_project_id.getValue()}`);
    }

    public setProjectIdToDelete(project_id: number) {
        this.delete_project_id.next(project_id);
    }

    public deleteTests(): void {
        this.delete()
        .toPromise().then(data => {            
            this.allTests = data;
            this.tests.next(this.allTests);            
        })
    }

    private delete(): Observable<Test[]> {                
        return this._http.delete<Test[]>(`${this.PATH}/project_id/${this.delete_project_id.getValue()}`)
    }

    public getNewTests(): void {
        this.findAllNewTests()
        .toPromise().then(data => {                          
            this.newTests.next(data);
            this.allNewTests = data;
        });
    }

    private findAllNewTests(): Observable<any> {
        return this._http.get<Test[]>(`${this.PATH}/last`);
    }
}