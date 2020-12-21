import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
  styleUrls: ['./boolean.component.scss']
})
export class BooleanComponent implements OnInit {

  booleanTypes: string[] = ["True", "False"];
  myForm: FormGroup;
  primary: string = "primary";

  constructor(public dialogRef: MatDialogRef<BooleanComponent>, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      boolean: ['', Validators.compose([Validators.required])]
    })
  }

  get boolean(): AbstractControl {
    return this.myForm.get('boolean');
  }

  get booleanToString(): string {
    return this.boolean.value;
  }

  set booleanToNewString(boolean: string) {    
    this.boolean.setValue(boolean);
  }

  closeDialog(): void {    
    this.dialogRef.close();
  }

  getValues(): string {
    return this.booleanToString;
  }
}
