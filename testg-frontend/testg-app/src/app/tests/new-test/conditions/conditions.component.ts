import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { NewConditionComponent } from './new-condition/new-condition.component';
import { UtilsMethods } from 'src/app/utils/utils_methods';
import { EventEmitterService } from 'src/app/event-emitter.service';
import { DataServiceParameter } from 'src/app/utils/parameter_data_service';
import { LocalParameter } from '../new-test.component';
import { DataServiceCondition } from 'src/app/utils/condition_data_service';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnInit {

  @ViewChild("conditionsViewContainerRef", { read: ViewContainerRef })

  VCR: ViewContainerRef;

  conditionsComponentRef = Array<ComponentRef<NewConditionComponent>>();

  @Input() parameters: LocalParameter[] = [];

  previous: string;

  next: string;

  nameToDelete: string;

  constructor(private CFR: ComponentFactoryResolver,
     private eventEmitterService: EventEmitterService,
      private _parameters_data: DataServiceParameter,
        private _conditions_data: DataServiceCondition) { }

  ngOnInit(): void {    
    this.initMethodsEvents();
  }

  private initMethodsEvents(): void {
    if(this.eventEmitterService.createConditionSub === undefined) {
      this.eventEmitterService.createConditionSub = this.eventEmitterService
      .invokeCreateCondition.subscribe(() => {
        this.createCondition();
      });
      if(this.eventEmitterService.removeAllConditionsSub === undefined) {
        this.eventEmitterService.removeAllConditionsSub = this.eventEmitterService
        .invokeRemoveAllConditions.subscribe(() => {
          this.removeAllConditions();
        });
      }
      if(this.eventEmitterService.updateStringsConditionsListSub === undefined) {
        this.eventEmitterService.updateStringsConditionsListSub = this.eventEmitterService
        .invokeUpdateStringsConditionsList.subscribe(() => {
          this.updateStringsConditionsList();
        });
      }
      if(this.eventEmitterService.removeEmptyStringsConditionsListSub === undefined) {
        this.eventEmitterService.removeEmptyStringsConditionsListSub = this.eventEmitterService
        .invokeRemoveEmptyStringsConditionsList.subscribe(() => {
          this.removeEmptyStringsConditionsList();
        });
      }
      if(this.eventEmitterService.removeDeletedParameterConditionsListSub === undefined) {
        this.eventEmitterService.removeDeletedParameterConditionsListSub = this.eventEmitterService
        .invokeRemoveDeletedParameterConditionsList.subscribe(() => {
          this.removeDeletedParameterConditionsList();
        });
      }
      if(this.eventEmitterService.setConditionsListSub === undefined) {
        this.eventEmitterService.setConditionsListSub = this.eventEmitterService
        .invokeSetConditionsList.subscribe(() => {
          this.setConditionsList();
        });
      }
    }
  }

  isNoParameters(): boolean {
    if(this.parameters.length !== 0) {    
      return false;
    }
    return true;
  }
  
  isOneParameter(): boolean {
    if(this.parameters.length === 1) {    
      return true;
    }
    return false;
  }

  createCondition(): void {
    let componentFactory = this.CFR.resolveComponentFactory(NewConditionComponent);
    let parametersComponentRef = this.VCR.createComponent(componentFactory);
    let parametersComponent = parametersComponentRef.instance;
    parametersComponent.condition_unique_key = UtilsMethods.generateRandomID();
    parametersComponent.parentRef = this;
    this.conditionsComponentRef.push(parametersComponentRef);    
  }

  removeCondition(key: string): void { 
    if (this.VCR.length < 1) return;
    let componentRef = this.conditionsComponentRef.filter(
      x => x.instance.condition_unique_key == key
    )[0];
    let vcrIndex: number = this.VCR.indexOf(componentRef as any);
    this.VCR.remove(vcrIndex);
    this.conditionsComponentRef = this.conditionsComponentRef.filter(
      x => x.instance.condition_unique_key !== key
    );
  }

  private removeAllConditions(): void {
    this.conditionsComponentRef.forEach((componentRef) => {
      this.removeCondition(componentRef.instance.condition_unique_key);
    });
  }

  // private verifyConditionParameters(): void {
  //   this.conditionsComponentRef.forEach((componentRef) => {
  //     componentRef.instance.verifyConditionParameters();
  //   });
  // }

  updateStringsConditionsList(): void {
    this.previous = this._parameters_data.getPrevious();
    this.next = this._parameters_data.getNext();
    if(this.previous !== "" && this.next !== "") {
      if(this.conditionsComponentRef.length > 0) {
        this.conditionsComponentRef.forEach((componentRef) => {
          componentRef.instance.updateConditionByParameterName(this.previous, this.next);
        });
      }
    }
  }

  removeEmptyStringsConditionsList(): void {    
    this.previous = this._parameters_data.getPrevious();     
    if(this.previous !== "" && this.next !== "") {
      if(this.conditionsComponentRef.length > 0) {
        this.conditionsComponentRef.forEach((componentRef) => {
          componentRef.instance.removeConditionByParameterName(this.previous);
        });
      }
    }
  }

  removeDeletedParameterConditionsList(): void {
    this.previous = this._parameters_data.getParameterName();
    if(this.previous !== "") {
      if(this.conditionsComponentRef.length > 0) {
        this.conditionsComponentRef.forEach((componentRef) => {
          componentRef.instance.removeConditionByParameterName(this.previous);
        });
      }
    }
  }

  setConditionsList(): void {
    this._conditions_data.setConditionsList(this.conditionsComponentRef);
  }
}


/*
  2) Validate the fields of new conditions when generating the tests.

  3) Validate all parameters and condition, make sure there are no duplicates when generating the tests.

  4) When generating the tests, make sure to validate all parameters and conditions.

  5) Complete the UI design for the conditions page in laptop and in large pc screen.

  6) Add option to export tests to excel.

  7) When adding new tests to UI, make sure to update to amount of tests for the relevant project.
*/

/*  CLEAN THE CODE, ADD TYPES TO METHODS AND VARIABLES,
    ADD PRIVATE/PROTECTED/PUBLIC TO ALL METHODS AND VARIABLES,
    DELETE ANY IRRELEVANT COMMENTS,
    DELETE INVALID IMPORTS  */