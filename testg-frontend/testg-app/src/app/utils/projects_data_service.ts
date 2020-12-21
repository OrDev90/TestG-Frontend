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

// {
//     "projects": [
//       {
//         "name": "Project1",
//         "type": "Web Application",
//         "id": "815745435",
//         "description": "dsgvfdhbgtrhbfdvbfdgef",
//         "existing_tests": "2"
//       },
//       {
//         "name": "Project3",
//         "type": "Web App",
//         "id": "2736a8sd8",
//         "description": "Best App",
//         "existing_tests": "0"
//       },
//       {
//         "name": "Project4",
//         "type": "Mobile App",
//         "id": "178s5hpy9",
//         "description": "mlksdmvlksdmk",
//         "existing_tests": "0"
//       },
//       {
//         "name": "Project5",
//         "type": "fdgfdgfd",
//         "id": "ahsejbd6x",
//         "description": "fdgdfgfdgdf",
//         "existing_tests": "0"
//       },
//       {
//         "name": "Project7",
//         "type": "csdgdsfv",
//         "id": "5u2ky9sdc",
//         "description": "vsdgvfdsfs",
//         "existing_tests": "0"
//       },
//       {
//         "name": "Project8",
//         "type": "fgfdgfd",
//         "id": "v9mnfiu69",
//         "description": "gfdgfdgfd",
//         "existing_tests": "0"
//       }
//     ]
//   }

    // public selected_project: Project;
    // private project = new BehaviorSubject<Project>(null);
    // public currentProject: Observable<Project> = this.project.asObservable();

    // private project_amount_tests = new BehaviorSubject<string>(null);
    // public current_project_amount_tests: Observable<string> = this.project_amount_tests.asObservable();

    // private new_project: Project;

    // private create_project_name = new BehaviorSubject<string>("");
    // current_create_project_name = this.create_project_name.asObservable();

    // private create_project_id = new BehaviorSubject<string>("");
    // current_create_project_id = this.create_project_id.asObservable();

    // private create_project_type = new BehaviorSubject<string>("");
    // current_create_project_type = this.create_project_type.asObservable();

    // private create_project_description = new BehaviorSubject<string>("");
    // current_create_project_description = this.create_project_description.asObservable();

    // private create_project_existing_tests = new BehaviorSubject<string>("");
    // current_create_project_existing_tests = this.create_project_existing_tests.asObservable();
    
    // private updated_project: Project;

    // private update_project_name = new BehaviorSubject<string>("");
    // current_update_project_name = this.update_project_name.asObservable();
    
    // private update_project_type = new BehaviorSubject<string>("");
    // current_update_project_type = this.update_project_name.asObservable();
    
    // private update_project_description = new BehaviorSubject<string>("");
    // current_update_project_description = this.update_project_name.asObservable();

    // constructor(private _http: HttpService) {}

        // change_create_project_data(projectName: string, projectType: string, projectDescription: string) {
    //     this.create_project_name.next(projectName);
    //     this.create_project_type.next(projectType);
    //     this.create_project_description.next(projectDescription);
    //     this.create_project_id.next(UtilsMethods.generateRandomID());
    //     this.create_project_existing_tests.next("0");
    //     this.createNewProject();
    // }

    // getProjects() {
    //     this._http.getProjects().subscribe(data => {
    //         this.projects.next(data);
    //         this.allProjects = data;
    //         });
    // }

    // getProject(id: string) {
    //     this._http.getProject(id).subscribe(data => {
    //         this.project.next(data);
    //         this.selected_project = data;
    //     });
    // }

    // createNewProject(): void {  
    //     this.new_project = new Project(this.create_project_id.getValue(),
    //      this.create_project_name.getValue(),
    //      this.create_project_type.getValue(), 
    //     this.create_project_description.getValue(),
    //          this.create_project_existing_tests.getValue());
    //         this._http.createProject(this.new_project).subscribe(
    //         (data: Project) => {
    //             this.allProjects.push(data);
    //             this.projects.next(this.allProjects);
    //         });
    // }

    // deleteProject() {  
    //     this._http.deleteProject(this.delete_project_id.getValue()).subscribe(() => {
    //         this.allProjects = this.allProjects.filter(item => item.id != this.delete_project_id.getValue());
    //         this.projects.next(this.allProjects);
    //     });
    // }

    // changeUpdatedProject(project: Project) {
    //     this.selected_update_project.next(project);
    // }

    // updateProject() {
    //     this.updated_project = new Project(this.selected_update_project.getValue().id,
    //      this.update_project_name.getValue(),
    //      this.update_project_type.getValue(),
    //      this.update_project_description.getValue(),
    //     this.selected_update_project.getValue().existingTests);
    //     this.update(this.updated_project);
    // }

    // private update(updated_project: Project) {
    //     this._http.updateProject(updated_project).subscribe(
    //      () => {
    //        this.getProjects();
    //      });
    //     }

    // change_update_project_data(projectName: string, projectType: string, projectDescription: string) {
    //     this.update_project_name.next(projectName);
    //     this.update_project_type.next(projectType);
    //     this.update_project_description.next(projectDescription);
    //     this.updateProject();
    // }