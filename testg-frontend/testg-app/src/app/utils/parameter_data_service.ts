import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../http.service';
import { ParameterType } from '../tests/new-test/parameters/parameterType';

@Injectable()
export class DataServiceParameter {

    constructor(private _http: HttpService) {}

    public allTypes: ParameterType[] = [];
    private types = new BehaviorSubject<ParameterType[]>(null);
    public currentTypes: Observable<ParameterType[]> = this.types.asObservable();

    private parameter_type = new BehaviorSubject<string>("");
    current_parameter_type = this.parameter_type.asObservable()

    private parameter_id = new BehaviorSubject<string>("");
    current_parameter_id = this.parameter_id.asObservable()

    private previous = new BehaviorSubject<string>("");
    current_previous = this.previous.asObservable();

    private next = new BehaviorSubject<string>("");
    current_next = this.next.asObservable();

    private parameter_name = new BehaviorSubject<string>("");
    current_parameter_name = this.parameter_name.asObservable();

    // getTypes() {
    //     this._http.getParameterTypes().subscribe(data => {
    //         this.types.next(data);
    //         this.allTypes = data;
    //     });
    // }

    setParameterType(type: string): void {
        this.parameter_type.next(type);
    }

    getParameterType(): string {
        return this.parameter_type.getValue();
    }

    setParameterID(id: string): void {
        this.parameter_id.next(id);
    }

    getParameterID(): string {
        return this.parameter_id.getValue();
    }

    setPrevious(previous: string): void {
        this.previous.next(previous);
    }

    getPrevious(): string {
        return this.previous.getValue();
    }

    setNext(next: string): void {
        this.next.next(next);
    }

    getNext(): string {
        return this.next.getValue();
    }

    setParameterName(name: string): void {
        this.parameter_name.next(name);
    }

    getParameterName(): string {
        return this.parameter_name.getValue();
    }
}