import { Component, OnInit } from '@angular/core';
import { Project } from '../projects/project';
import { Test } from './test'
import { Observable, from } from 'rxjs';
import { DataServiceProject } from '../utils/projects_data_service';
import { DataServiceTest } from '../utils/tests_data_service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  constructor(private _projects_data: DataServiceProject, private _tests_data: DataServiceTest) { }
  
  projects: Project[];
  project: Project;
  is_project_selected: boolean = false;
  hasTests: boolean = true;

  tests: Test[];

  ngOnInit(): void {
    this.getProjects();
    this.pullProjectsFromService();
  }

  getProjects(): void {
    this._projects_data.getProjects();
  }

  private pullProjectsFromService(): void {
    this._projects_data.currentProjects.subscribe(projects => this.projects = projects);    
  }

  getProjectById(): void {
    this._projects_data.getProjectById();
  }

  private pullProjectFromService(): void {
    this._projects_data.currentProject.subscribe(project => this.project = project);
  }

  getTests(): void {
    this._tests_data.getTestsByProjectId();
  }

  private pullTestsFromService(): void {
    this._tests_data.currentTests.subscribe(tests => this.tests = tests);
  }

  selectProject(project: Project) {    
    if(project.existingTests === 0) {
      this.hasTests = false;
    } else {
      this.hasTests = true;
    }    
    this.is_project_selected = true;
    this._projects_data.setIdToGet(project.id);
    this.getProjectById();
    this.pullProjectFromService();
    this._tests_data.setIdToGet(project.id);
    this.getTests();
    this.pullTestsFromService();
  }
}















// {
//   "tests": [
//     {
//       "name": "Test 1",
//       "type": "SUCCESS",
//       "id": "123",
//       "project_id": "7ts768sy5",
//       "combinations": [
//         {
//           "parameter_name": "quoted",
//           "parameter_type": "integer",
//           "parameter_value": "no"
//         },
//         {
//           "parameter_name": "pattern.size",
//           "parameter_type": "string",
//           "parameter_value": "manyChars"
//         }
//       ]
//     },
//     {
//       "name": "Test 2",
//       "type": "FAILURE",
//       "id": "456",
//       "project_id": "7ts768sy5",
//       "combinations": [
//         {
//           "parameter_name": "quoted",
//           "parameter_type": "arg",
//           "parameter_value": "no"
//         },
//         {
//           "parameter_name": "pattern.size",
//           "parameter_type": "arg",
//           "parameter_value": "manyChars"
//         }
//       ]
//     }
//   ]
// }