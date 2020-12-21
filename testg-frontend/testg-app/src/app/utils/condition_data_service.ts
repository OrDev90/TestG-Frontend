import { Injectable, ComponentRef } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { ConditionType } from '../tests/new-test/conditions/conditionType';
import { NewConditionComponent } from '../tests/new-test/conditions/new-condition/new-condition.component';

@Injectable()
export class DataServiceCondition {

    constructor() {}

    public allConditions: ConditionType[] = [];
    private conditions = new BehaviorSubject<ConditionType[]>(null);
    public currentConditions: Observable<ConditionType[]> = this.conditions.asObservable();

    private condition_type = new BehaviorSubject<string>("");
    current_condition_type = this.condition_type.asObservable()

    private conditions_list = new BehaviorSubject<Array<ComponentRef<NewConditionComponent>>>(null);
    current_conditions_list = this.conditions_list.asObservable()

    setConditionType(type: string): void {
        this.condition_type.next(type);
    }

    getConditionType(): string {
        return this.condition_type.getValue();
    }

    getConditionsList(): Array<ComponentRef<NewConditionComponent>> {
        return this.conditions_list.getValue();
    }

    setConditionsList(conditions: Array<ComponentRef<NewConditionComponent>>): void {
        this.conditions_list.next(conditions);
    }
}