import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-string',
  templateUrl: './string.component.html',
  styleUrls: ['./string.component.scss']
})
export class StringComponent implements OnInit {

  myForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<StringComponent>, private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      string: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z A-Z]*$'), Validators.maxLength(50)])]
    })
  }

  get string(): AbstractControl {
    return this.myForm.get('string');
  }

  get stringToString(): string {
    return this.string.value;
  }

  set stringToNewString(string: string) {    
    this.string.setValue(string);
  }

  closeDialog(): void {    
    this.dialogRef.close();
  }

  getValues(): string {
    return this.stringToString;
  }
}
