import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InputField } from '../tests/new-test/input-field';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataServiceInputField {
    
    constructor(private _http: HttpClient) {}

    readonly PATH = "http://localhost:8080/input_field"

    public allInputFields: InputField[] = [];
    private input_fields = new BehaviorSubject<InputField[]>(null);
    current_input_fields = this.input_fields.asObservable();

    private selected_create_input_field = new BehaviorSubject<InputField>(null);
    public current_created_input_field: Observable<InputField> = this.selected_create_input_field.asObservable();

    createInputField(): void {
        this.insert()
        .toPromise().then(data => {
            this.allInputFields.push(data);
            this.input_fields.next(this.allInputFields);
        });
    }

    private insert(): Observable<InputField> {
        return this._http.post<InputField>(`${this.PATH}`, this.selected_create_input_field.getValue());
    }

    public setInputFieldToCreate(inputField: InputField) {
        this.selected_create_input_field.next(inputField)
    }
}