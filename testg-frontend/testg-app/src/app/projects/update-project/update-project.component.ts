import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceProject } from '../../utils/projects_data_service';
import { Project } from '../project';
import { Validators, FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';
import { ProjectUpdatePayload } from './project-update-payload';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
  
  myForm: FormGroup;

  constructor(private _dialog: MatDialog, private _projects_data: DataServiceProject, private _fb: FormBuilder) { }

  update_project: Project;

  ngOnInit(): void {
    this._projects_data.current_updated_project.subscribe(update_project => this.update_project = update_project);
    this.myForm = this._fb.group({
      name: [this.update_project.name, Validators.compose([Validators.required, Validators.maxLength(20)])],
      type: [this.update_project.type, Validators.compose([Validators.required, Validators.maxLength(20)])],
      description: [this.update_project.description, Validators.compose([Validators.required, Validators.maxLength(50)])]
    })
  }

  get name(): AbstractControl {
    return this.myForm.get('name');
  }

  get nameToString(): string {
    return this.name.value;
  }

  set nameToNewString(string: string) {    
    this.name.setValue(string);
  }

  get type(): AbstractControl {
    return this.myForm.get('type');
  }

  get typeToString(): string {
    return this.type.value;
  }

  set typeToNewString(string: string) {    
    this.type.setValue(string);
  }

  get description(): AbstractControl {
    return this.myForm.get('description');
  }

  get descriptionToString(): string {
    return this.description.value;
  }

  set descriptionToNewString(string: string) {    
    this.description.setValue(string);
  }

  closeDialog(): void {    
    this._dialog.closeAll();
  }

  updateProject(): void {
    this.setUpdateProjectPayload();
    this._projects_data.updateProject();
    this.closeDialog();
  }

  private setUpdateProjectPayload(): void {
    this._projects_data.setUpdateProjectPayload(new ProjectUpdatePayload(this.nameToString,
       this.typeToString, this.descriptionToString));
  }
}