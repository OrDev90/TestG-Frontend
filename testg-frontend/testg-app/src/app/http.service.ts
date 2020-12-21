import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {}

  readonly ROOT_URL = 'http://localhost:';
  readonly PROJECT_PORT = '3000'
  readonly TEST_PORT = '3001'
  readonly PARAMETER_TYPES_PORT = "3002";
  readonly CONDITION_TYPES_PORT = "3003";
  readonly INPUT_FIELD_PORT = "3004";
  readonly NEW_TESTS_PORT = "3005"

  // getProjects(): Observable<Project[]> {
  //   return this._http.get<Project[]>(`${this.ROOT_URL}${this.PROJECT_PORT}/projects`);
  // }

  // getProject(id: string): Observable<any> {
  //   let params = new HttpParams().set('id', id);
  //   return this._http.get(`${this.ROOT_URL}${this.PROJECT_PORT}/projects`, { params });
  // }

  // createProject(project: Project): Observable<Project> {
  //   return this._http.post<Project>(`${this.ROOT_URL}${this.PROJECT_PORT}/projects`, project);
  // }

  // updateProject(project: Project): Observable<void> {
  //   return this._http.put<void>(`${this.ROOT_URL}${this.PROJECT_PORT}/projects/${project.id}`, project);
  // }

  // deleteProject(id: string): Observable<Project> {
  //   return this._http.delete<Project>(`${this.ROOT_URL}${this.PROJECT_PORT}/projects/${id}`);
  // }

  // deleteTest(id: string): Observable<Test> {
  //   return this._http.delete<Test>(`${this.ROOT_URL}${this.TEST_PORT}/tests/${id}`);
  // }

  // getTests(): Observable<any> {
  //   return this._http.get<Test[]>(`${this.ROOT_URL}${this.TEST_PORT}/tests`);
  // }

  // getTestsByProjectID(project_id: string): Observable<any> {
  //   return this._http.get<Test[]>(`${this.ROOT_URL}${this.TEST_PORT}/tests/?project_id=${project_id}`);
  // }

  // getParameterTypes(): Observable<any> {
  //   return this._http.get<ParameterType[]>(`${this.ROOT_URL}${this.PARAMETER_TYPES_PORT}/parameter_types`);
  // }

  // getConditionTypes(): Observable<any> {
  //   return this._http.get<ConditionType[]>(`${this.ROOT_URL}${this.CONDITION_TYPES_PORT}/condition_types`);
  // }

  // createInputField(input_field: InputField): Observable<InputField> {
  //   return this._http.post<InputField>(`${this.ROOT_URL}${this.INPUT_FIELD_PORT}/input_field`, input_field);
  // }
  
  // getNewTests(): Observable<any> {
  //   return this._http.get<NewTest[]>(`${this.ROOT_URL}${this.NEW_TESTS_PORT}/new_tests`);
  // }
}