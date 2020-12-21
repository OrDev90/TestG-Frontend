import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { NewTestComponent } from '../new-test.component';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataServiceParameter } from 'src/app/utils/parameter_data_service';
import { MatDialog } from '@angular/material/dialog';
import { IntegerComponent, Integer } from './integer/integer.component';
import { StringComponent } from './string/string.component';
import { BooleanComponent } from './boolean/boolean.component';
import { NotesComponent } from './notes/notes.component';
import { startWith, pairwise } from 'rxjs/operators';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss']
})

export class ParametersComponent implements OnInit {

  myForm: FormGroup;

  public parameter_unique_key: string;
  public parentRef: NewTestComponent;

  types: string[] = ["Integer", "String", "Boolean"];

  stringValues: string[] = [];
  integerValues: Integer = null;
  booleanValues: string[] = [];

  primary = "primary";
  notes: string = "";

  isLimitString: boolean = false;
  isLimitInteger: boolean = false;
  isLimitBoolean: boolean = false;

  constructor(private _parameters_data: DataServiceParameter, private _dialog: MatDialog, private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this._fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      type: ['', Validators.compose([Validators.required])]
    })
    this.nameChangeEventListener();
  }

  private nameChangeEventListener(): void {
    this.name.valueChanges
    .pipe(startWith(this.name), pairwise())
    .subscribe(([previous, next]: [any, any]) => {
      if(next !== "") {
        this.parentRef.updateStrings(previous, next);
      } else {
        this.parentRef.removeEmptyStrings(previous);
      }
    });
  }

  removeParameter() : void {
    this.parentRef.removeParameter(this.parameter_unique_key);
  }

  get name(): AbstractControl {
    return this.myForm.get('name');
  }

  get type(): AbstractControl {
    return this.myForm.get('type');
  }

  get nameToString(): string {
    return this.name.value;
  }

  get typeToString(): string {
    return this.type.value;
  }

  set nameToNewString(name: string) {    
    this.name.setValue(name);
  }

  set typeToNewString(type: string) {
    this.type.setValue(type);
  }

  addValue(): void {
    if(this.type.errors !== null) {
      this.type.markAsDirty();
    } else {
      if(!this.isLimitInteger && !this.isLimitString && !this.isLimitBoolean) {
        switch(this.typeToString) {
          case "Integer": {
            const dialogRef = this._dialog.open(IntegerComponent);
            dialogRef.afterClosed().subscribe(data => {              
              if(data !== undefined) {                                
                this.integerValues = data;
                if(this.integerValues != null) {
                  this.disableTypeField();
                }
              }
            });
            break;
          }
          case "String": {
            const dialogRef = this._dialog.open(StringComponent);
            dialogRef.afterClosed().subscribe(data => {
              if(data !== undefined) {
                if(!this.stringValues.includes(data)) {
                  this.stringValues.push(data);
                  this.disableTypeField();
                  this.inspectArraySize(this.stringValues, "String");
                }
              }
            });
            break;
          }
          case "Boolean": {
            const dialogRef = this._dialog.open(BooleanComponent);
            dialogRef.afterClosed().subscribe(data => {
              if(data !== undefined) {
                if(!this.booleanValues.includes(data)) {
                  this.booleanValues.push(data);
                  this.disableTypeField();
                  this.inspectArraySize(this.booleanValues, "Boolean");
                }
              }
            });
            break;
          }
        }
      }
    }
  }

  private disableTypeField(): void {
    this.type.disable();
  }

  private inspectArraySize(array: string[], arrayType: string): void {
    switch(arrayType) {
      case "String": {
        if(array.length >= 5) {
          this.isLimitString = true;
        }
        break;
      }
      case "Boolean": {
        if(array.length >= 2) {
          this.isLimitBoolean = true;
        }
        break;
      }
    }
  }

  addNotes(): void {
    const dialogRef = this._dialog.open(NotesComponent, {
      data: {
        notes: this.notes
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if(data !== undefined) {
        this.notes = data;
      }
    });
  }
}