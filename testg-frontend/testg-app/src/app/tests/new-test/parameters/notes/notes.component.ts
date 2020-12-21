import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  myForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<NotesComponent>, private _fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.myForm = this._fb.group({
      notes: [this.data.notes, Validators.compose([Validators.required, Validators.maxLength(120)])]
    })
  }
  
  get notes(): AbstractControl {
    return this.myForm.get('notes');
  }

  get notesToString(): string {
    return this.notes.value;
  }

  set notesToNewString(string: string) {    
    this.notes.setValue(string);
  }

  closeDialog(): void {    
    this.dialogRef.close();
  }
}
