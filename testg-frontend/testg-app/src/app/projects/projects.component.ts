import { Component, OnInit } from '@angular/core';
import { Project } from './project';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectComponent } from './new-project/new-project.component';
import { DataServiceProject } from '../utils/projects_data_service';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { UpdateProjectComponent } from './update-project/update-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})

export class ProjectsComponent implements OnInit {

  projects: Project[];

  constructor(private _dialog: MatDialog, private _projects_data: DataServiceProject) {}

  ngOnInit(): void {
    this.getProjects();
    this.pullProjectsFromService();
  }

  getProjects(): void {
    this._projects_data.getProjects();
  }

  pullProjectsFromService(): void {
    this._projects_data.currentProjects.subscribe(projects => this.projects = projects);    
  }

  openNewProjectDialog() {
    this._dialog.open(NewProjectComponent);
  }

  openDeleteProjectDialog(id: number) {
    this._projects_data.setIdToDelete(id);
    this._dialog.open(DeleteProjectComponent);
  }

  openUpdateProjectDialog(project: Project) {
    this._projects_data.setProjectToUpdate(project);
    this._dialog.open(UpdateProjectComponent);
  }
}