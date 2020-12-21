import { Component, OnInit, ComponentRef, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { ParametersComponent } from './parameters/parameters.component';
import { DataServiceProject } from 'src/app/utils/projects_data_service';
import { Project } from 'src/app/projects/project';
import { Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { UtilsMethods } from 'src/app/utils/utils_methods';
import { EventEmitterService } from 'src/app/event-emitter.service';
import { DataServiceParameter } from 'src/app/utils/parameter_data_service';
import { NewConditionComponent } from './conditions/new-condition/new-condition.component';
import { DataServiceCondition } from 'src/app/utils/condition_data_service';
import { DataServiceInputField } from 'src/app/utils/input_field_data_service';
import { Parameter } from './parameters/Parameter';
import { Condition } from './conditions/Condition';
import { InputField } from './input-field';
import { DataServiceTest } from 'src/app/utils/tests_data_service';
import { Test } from '../test';
import { browser } from 'protractor';

export interface LocalParameter {
  name: string,
  values: string[],
  type: string,
  from?: string,
  to?: string
}

@Component({
  selector: 'app-new-test',
  templateUrl: './new-test.component.html',
  styleUrls: ['./new-test.component.scss']
})

export class NewTestComponent implements OnInit {

  @ViewChild("parametersViewContainerRef", { read: ViewContainerRef })

  VCR: ViewContainerRef;

  projects: Project[];

  myForm: FormGroup;

  parametersComponentRef = Array<ComponentRef<ParametersComponent>>();

  conditionsComponentRef = Array<ComponentRef<NewConditionComponent>>();

  parameters: LocalParameter[] = [];

  previous: string;
  
  next: string;

  normalizedParameters: Parameter[] = [];

  normalizedConditions: Condition[] = [];

  project_id: string;

  tests: Test[];

  isButtonClicked: boolean = false;

  isResults: boolean = false;

  constructor(private CFR: ComponentFactoryResolver,
     private _projects_data: DataServiceProject,
      private _fb: FormBuilder,
       private eventEmitterService: EventEmitterService,
        private _parameters_data: DataServiceParameter,
          private _conditions_data: DataServiceCondition,
            private _input_field_data: DataServiceInputField, 
            private _tests_data: DataServiceTest) {}

  ngOnInit(): void {
    this._projects_data.getProjects();
    this.pullProjectsFromProvider();
    this.myForm = this._fb.group({
      project_name: ['', Validators.compose([Validators.required])]});
    }
  private pullProjectsFromProvider() {
    this._projects_data.currentProjects.subscribe(projects => this.projects = projects);    
  }

  private pullNewTestsFromProvider() {
    this._tests_data.currentNewTests.subscribe(new_tests => this.tests = new_tests)    
  }

  public add_project_id(projectID: string): void {
    this.project_id = projectID;
  }

  get project_name(): AbstractControl {
    return this.myForm.get('project_name');
  }

  get projectNameToString(): string {
    return this.project_name.value;
  }

  set projectNameToNewString(project_name: string) {    
    this.project_name.setValue(project_name);
  }

  createParameter(): void {
    if(this.project_name.errors !== null) {
      this.project_name.markAsDirty();
    } else {
      let componentFactory = this.CFR.resolveComponentFactory(ParametersComponent);
      let parametersComponentRef = this.VCR.createComponent(componentFactory);
      let parametersComponent = parametersComponentRef.instance;
      parametersComponent.parameter_unique_key = UtilsMethods.generateRandomID();
      parametersComponent.parentRef = this;
      this.parametersComponentRef.push(parametersComponentRef);
    }
  }

  removeParameter(key: string): void { 
    if (this.VCR.length < 1) return;
    let componentRef = this.parametersComponentRef.filter(
      x => x.instance.parameter_unique_key == key
    )[0];
    let vcrIndex: number = this.VCR.indexOf(componentRef as any);
    this.VCR.remove(vcrIndex);
    this.removeDeletedParameter(this.parametersComponentRef.find((ref) => {      
        return ref.instance.parameter_unique_key === key;
    }));    
    this.parametersComponentRef = this.parametersComponentRef.filter(
      x => x.instance.parameter_unique_key !== key
    );
    if(this.parametersComponentRef.length === 0 || this.parametersComponentRef.length === 1) {
      this.removeAllConditions();
    }
  }

  validateParameters($event: any): void {    
    if(this.parametersComponentRef.length !== 0) {
      if($event.srcElement.innerText === "Conditions") {   
        this.parametersComponentRef.forEach((componentRef) => {
          if(componentRef.instance.nameToString !== "" &&
           componentRef.instance.typeToString !== "" &&
            this.isArrayHasValues(componentRef)) {
            if(!this.includes(componentRef.instance.nameToString)) {
              if(componentRef.instance.integerValues !== null) {
                this.parameters.push({name: componentRef.instance.nameToString,
                   values: componentRef.instance.integerValues.values,
                   type: componentRef.instance.typeToString,
                   from: componentRef.instance.integerValues.from,
                   to: componentRef.instance.integerValues.to});
              } else if(componentRef.instance.stringValues.length !== 0) {
                this.parameters.push({name: componentRef.instance.nameToString,
                  values: componentRef.instance.stringValues,
                  type: componentRef.instance.typeToString});
              } else {
                this.parameters.push({name: componentRef.instance.nameToString,
                  values: componentRef.instance.booleanValues, 
                  type: componentRef.instance.typeToString});
              }
            }
          }
        });
      }
    }
  }

  private includes(parameterName: string): boolean {
    for(let parameter of this.parameters) {
      if(parameter.name === parameterName) {
        return true;
      }
    }
    return false;
  }

  private removeDeletedParameter(componentRef: ComponentRef<ParametersComponent>): void {   
    this.removeDeletedParameterParametersList(componentRef);
    this._parameters_data.setParameterName(componentRef.instance.nameToString);
    this.eventEmitterService.removeDeletedParameterConditionsList();
  }

  private removeDeletedParameterParametersList(componentRef: ComponentRef<ParametersComponent>): void {
    let index = this.indexOf(componentRef.instance.nameToString);
    this.parameters.splice(index, 1);
  }

  private indexOf(parameterName: string): number {
    for(let index in this.parameters) {
      if(this.parameters[index].name === parameterName) {
        return Number(index);
      }
    }
    return -1;
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

  isTwoOrMoreParameters(): boolean {
    if(this.parameters.length >= 2) {    
      return false;
    }
    return true;
  }

  createCondition(): void {
    if(!this.isNoParameters() && !this.isOneParameter()) {
      this.eventEmitterService.createCondition();
    }
  }

  removeAllConditions(): void {
    this.eventEmitterService.removeAllConditions();
  }

  public updateStrings(previous: string, next: string): void {
    if(typeof previous === 'string' && typeof next === 'string') {
      this.updateStringsParametersList(previous, next);
      this._parameters_data.setPrevious(previous);
      this._parameters_data.setNext(next);
      this.eventEmitterService.updateStringsConditionsList();
    }
  }

  private updateStringsParametersList(previous: string, next: string): void {
    for(let index in this.parameters) {
      if(this.parameters[index].name === previous) {
        this.parameters[index].name = next;
        break;
      }
    }
  }

  public removeEmptyStrings(previous: string): void {    
    if(typeof previous === 'string') {
      this.removeEmptyStringsParametersList(previous);
      this._parameters_data.setPrevious(previous);
      this.eventEmitterService.removeEmptyStringsConditionsList();
    }
  }

  private removeEmptyStringsParametersList(previous: string): void {
    this.parameters = this.parameters.filter(
      parameter => parameter.name !== previous
    );
  }

  private isArrayHasValues(componentRef: ComponentRef<ParametersComponent>): boolean {
    if(componentRef.instance.integerValues !== null ||
      componentRef.instance.stringValues.length !== 0 ||
       componentRef.instance.booleanValues.length !== 0) {
         return true;
       }
       return false;
  }

  async createNewInputField(): Promise<void> {
    this.isButtonClicked = true;
    this.getConditions();
    this.setInputFieldToCreate();
    this._input_field_data.createInputField();
    await delay(5000);
    this.isResults = true;
    this._tests_data.getNewTests();
    this.pullNewTestsFromProvider();
  }

  private setInputFieldToCreate(): void {
    this._input_field_data.setInputFieldToCreate(new InputField(this.projectNameToString,
      this.project_id,
      this.normalizeParametersComponentRef(this.parametersComponentRef),
    this.normalizeConditionsComponentRef(this.conditionsComponentRef)));
    this.normalizedParameters = [];
    this.normalizedConditions = [];
  }

  private getConditions() {
    this.eventEmitterService.setConditionsList();
    this.conditionsComponentRef = this._conditions_data.getConditionsList();
  }

  private normalizeParametersComponentRef(parametersComponentRef: Array<ComponentRef<ParametersComponent>>): Parameter[] {
    parametersComponentRef.forEach(ref => {
      if(ref.instance.typeToString === 'Integer') {
        this.normalizedParameters.push(new Parameter(this.removeStringSpacesFromString(ref.instance.myForm.controls.name.value),
        this.removeStringSpacesFromString(ref.instance.myForm.controls.type.value), this.removeStringSpacesFromString(ref.instance.notes),
         this.getValues(ref), ref.instance.integerValues.from, ref.instance.integerValues.to, ref.instance.integerValues.interval));
      } else {
        this.normalizedParameters.push(new Parameter(this.removeStringSpacesFromString(ref.instance.myForm.controls.name.value),
        this.removeStringSpacesFromString(ref.instance.myForm.controls.type.value), this.removeStringSpacesFromString(ref.instance.notes), this.getValues(ref)));
      }
    });
    return this.normalizedParameters;
  }

  private normalizeConditionsComponentRef(conditionsComponentRef: Array<ComponentRef<NewConditionComponent>>): Condition[] {
    conditionsComponentRef.forEach(ref => {
      this.normalizedConditions.push(new Condition(this.removeStringSpacesFromString(ref.instance.myForm.value.condition),
      this.removeStringSpacesFromString(ref.instance.myForm.value.firstParameter),
        this.removeStringSpacesFromString(ref.instance.myForm.value.firstValue),
          this.removeStringSpacesFromString(ref.instance.myForm.value.firstArithmetic),
            this.removeStringSpacesFromString(ref.instance.myForm.value.secondParameter),
              this.removeStringSpacesFromString(ref.instance.myForm.value.secondValue),
                this.removeStringSpacesFromString(ref.instance.myForm.value.secondArithmetic)));
    });
    return this.normalizedConditions;
  }

  private getValues(reference: any): string[] {
    if(reference.instance.booleanValues.length !== 0) {
      return this.removeStringSpacesFromArray(reference.instance.booleanValues);
    }
    if(reference.instance.stringValues.length !== 0) {
      return this.removeStringSpacesFromArray(reference.instance.stringValues);
    }
    if(reference.instance.integerValues !== null) {
      return this.removeStringSpacesFromArray(reference.instance.integerValues.values);
    }
  }

  private removeStringSpacesFromString(value: string): string {
    return value.replace(/ /g, "_");
  }

  private removeStringSpacesFromArray(values: string[]): string[] {
    const finalValues = values.map(value => {
      return this.removeStringSpacesFromString(value);
    })    
    return finalValues;
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}