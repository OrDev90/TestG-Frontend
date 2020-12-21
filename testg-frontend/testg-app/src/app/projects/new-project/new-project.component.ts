import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataServiceProject } from '../../utils/projects_data_service';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Project } from '../project';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  myForm: FormGroup;

  constructor(private _dialog: MatDialog, private _projects_data: DataServiceProject, private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this._fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      type: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
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

  createNewProject(): void {
    this.setProjectToCreate();
    this._projects_data.createProject();
    this.closeDialog();
  }

  private setProjectToCreate(): void {
    this._projects_data.setProjectToCreate(new Project(this.nameToString,
      this.typeToString,
       this.descriptionToString,
        0))    
  }
}
