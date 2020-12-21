import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { Project } from '../projects/project';
import { ProjectUpdatePayload } from '../projects/update-project/project-update-payload';
import { DataServiceTest } from './tests_data_service';

@Injectable()
export class DataServiceProject {

    constructor(private _http: HttpClient,  private _tests_data: DataServiceTest) {}

    readonly PATH = "http://localhost:8080/projects"

    public allProjects: Project[] = [];
    private projects = new BehaviorSubject<Project[]>(null);
    public currentProjects: Observable<Project[]> = this.projects.asObservable();

    private delete_project_id = new BehaviorSubject<number>(null);
    current_delete_project_id = this.delete_project_id.asObservable();

    private selected_update_project = new BehaviorSubject<Project>(null);
    public current_updated_project: Observable<Project> = this.selected_update_project.asObservable();

    private update_project_payload = new BehaviorSubject<ProjectUpdatePayload>(null);
    current_update_project_payload = this.update_project_payload.asObservable();

    private selected_create_project = new BehaviorSubject<Project>(null);
    public current_created_project: Observable<Project> = this.selected_create_project.asObservable();

    private get_project_id = new BehaviorSubject<number>(null);
    current_get_project_id = this.get_project_id.asObservable();

    private selected_project = new BehaviorSubject<Project>(null);
    public currentProject: Observable<Project> = this.selected_project.asObservable();

    public getProjects(): void {
        this.findAll()
        .toPromise().then(data => {      
            this.projects.next(data);
            this.allProjects = data;
        });
    }

    private findAll(): Observable<Project[]> {
        return this._http.get<Project[]>(this.PATH);
    }

    public setIdToDelete(id: number) {
        this.delete_project_id.next(id);        
    }

    public deleteProject(): void {
        this.delete()
        .toPromise().then(data => {            
            this.allProjects = this.allProjects.filter(project => project.id != data.id);
            this.projects.next(this.allProjects);            
        })
        this.setProjectIdToDelete();
        this.deleteTestsByProjectId();
    }
    
    private delete(): Observable<Project> {
        return this._http.delete<Project>(`${this.PATH}/${this.delete_project_id.getValue()}`);
    }
    
    private setProjectIdToDelete(): void {
        this._tests_data.setProjectIdToDelete(this.delete_project_id.getValue());
    }

    private deleteTestsByProjectId() {
        this._tests_data.deleteTests();
    }

    public setProjectToUpdate(project: Project) {
        this.selected_update_project.next(project);        
    }

    public setUpdateProjectPayload(project_update_payload: ProjectUpdatePayload) {
        this.update_project_payload.next(project_update_payload);
    }

    public updateProject(): void {
        this.save()
        .toPromise().then(() => {
            this.getProjects();
        })
    }

    private save(): Observable<void> {
        return this._http.put<void>(`${this.PATH}/${this.selected_update_project.getValue().id}`,
         this.update_project_payload.getValue());
    }

    public setProjectToCreate(project: Project) {
        this.selected_create_project.next(project)
    }

    public createProject(): void {
        this.insert()
        .toPromise().then(data => {
            this.allProjects.push(data);
            this.projects.next(this.allProjects);            
        })
    }

    private insert(): Observable<Project> {
        return this._http.post<Project>(`${this.PATH}`, this.selected_create_project.getValue());
    }

    public setIdToGet(id: number) {
        this.get_project_id.next(id);           
    }

    public getProjectById(): void {
        this.findById()
        .toPromise().then(data => {       
            this.selected_project.next(data);            
        })
    }
    
    private findById(): Observable<any> {        
        return this._http.get<Project>(`${this.PATH}/${this.get_project_id.getValue()}`);
    }
}