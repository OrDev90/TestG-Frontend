import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceProject } from '../../utils/projects_data_service';
import { DataServiceTest } from 'src/app/utils/tests_data_service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent implements OnInit {

  constructor(private _dialog: MatDialog, private _projects_data: DataServiceProject, private _tests_data: DataServiceTest) { }

  ngOnInit(): void {}

  public closeDialog(): void {    
    this._dialog.closeAll();
  }

  deleteProject() {
    this._projects_data.deleteProject();
    this.closeDialog();
  }
}
