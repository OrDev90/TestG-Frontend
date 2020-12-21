import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { SingleValueComponent } from './single-value/single-value.component';
import { UtilsMethods } from 'src/app/utils/utils_methods';

export class Integer {
  from: string;
  to: string;
  interval: string;
  values: string[];

  constructor(from: string, to: string, interval: string, values: string[]) {
    this.from = from;
    this.to = to;
    this.interval = interval;
    this.values = values;
  }
}

@Component({
  selector: 'app-integer',
  templateUrl: './integer.component.html',
  styleUrls: ['./integer.component.scss']
})

export class IntegerComponent implements OnInit {

  myForm: FormGroup;
  primary: string = "primary";

  singleValues: string[] = [];

  isLimitValues: boolean = false;

  intervals: string[] = ["10%", "20%", "30%", "40%", "50%", "60%", "70%", "80%", "90%", "100%"];

  values: string[] = [];

  constructor(public dialogRef: MatDialogRef<IntegerComponent>, private _fb: FormBuilder, private _dialog: MatDialog) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      from: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      to: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
      interval: ['', Validators.compose([Validators.required])],
    },
    {
      validators: [RangeValidator('from', 'to')]
    }
    );
  }

  get from(): AbstractControl {
    return this.myForm.get('from');
  }
  
  get to(): AbstractControl {
    return this.myForm.get('to');
  }

  get interval(): AbstractControl {
    return this.myForm.get('interval');
  }

  get fromToNumber(): number {
    return this.from.value;
  }

  get toToNumber(): number {
    return this.to.value;
  }

  get intervalToString(): string {
    return this.interval.value;
  }
  
  set fromToNewNumber(from: number) {    
    this.from.setValue(from);
  }

  set toToNewNumber(to: number) {    
    this.to.setValue(to);
  }

  set intervalToNewString(interval: string) {
    this.interval.setValue(interval);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  // clearInputs(): void {    
  //   this.singleValue.markAsPristine();
  //   this.from.markAsPristine();
  //   this.to.markAsPristine();
  //   this.singleValueToNewNumber = null;
  //   this.fromToNewNumber = null;
  //   this.toToNewNumber = null;
  // }

  getValues(): Integer {
    return new Integer(String(this.fromToNumber), String(this.toToNumber),
     this.intervalToString, this.values)
  }

  openSingleValueDialog(): void {
    if(!this.isLimitValues && !this.myForm.invalid) {
      const dialogRef = this._dialog.open(SingleValueComponent, {
        data: {
          from: this.fromToNumber,
          to: this.toToNumber
        }
      });
      dialogRef.afterClosed().subscribe(data => {
        if(data !== undefined) {
          if(!this.singleValues.includes(data)) {
              this.singleValues.push(data);
              if(this.singleValues.length >= 5) {
                this.isLimitValues = true;
              }   
            }
          }
      });
    }
  }

  public generateRangeValues(): void {
    this.mergeArrays();
    let iterationsAmount = UtilsMethods.getIterationsAmount(String(this.toToNumber), this.intervalToString) - this.values.length;
      while(iterationsAmount > 0) {
        let randomNumber = UtilsMethods.getRandomNumberInRangeInclusive(String(this.fromToNumber), String(this.toToNumber));
        if(!this.values.includes(String(randomNumber))) {
          this.values.push(String(randomNumber));
          iterationsAmount--;
        }
      }
      this.values = this.values.sort((a, b) => {
        return Number(a) - Number(b);
      });   
  }

  private mergeArrays(): void {
    for(let value of this.singleValues) {
      if(!this.values.includes(value)) {
        this.values.push(value);
      }
    }
  }
}
function RangeValidator(
  controlName: string,
  comparingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const comparingControl = formGroup.controls[comparingControlName];
    if (comparingControl.errors && !comparingControl.errors.mustMatch) {
      return;
    }
    if (Number(control.value) > Number(comparingControl.value)) {
      control.setErrors({ range: true });
      comparingControl.setErrors({ range: true });
    } else if(Number(control.value) === Number(comparingControl.value)) {
      control.setErrors({ same: true });
      comparingControl.setErrors({ same: true });
    } else {
      control.setErrors(null);
      comparingControl.setErrors(null);
    }
  };
}