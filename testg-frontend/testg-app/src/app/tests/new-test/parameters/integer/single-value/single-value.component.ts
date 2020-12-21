import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-single-value',
  templateUrl: './single-value.component.html',
  styleUrls: ['./single-value.component.scss']
})
export class SingleValueComponent implements OnInit {

  myForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<SingleValueComponent>, private _fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      singleValue: ["", Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'),
       Validators.max(this.data.to), Validators.min(this.data.from)])]
    });
  }
  
  get singleValue(): AbstractControl {
    return this.myForm.get('singleValue');
  }

  get singleValueToString(): string {
    return this.singleValue.value;
  }

  set singleValueToNewString(string: string) {    
    this.singleValue.setValue(string);
  }

  closeDialog(): void {    
    this.dialogRef.close();
  }
}
