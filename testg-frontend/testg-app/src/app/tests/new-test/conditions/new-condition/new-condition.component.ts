import { Component, OnInit } from '@angular/core';
import { ConditionsComponent } from '../conditions.component';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ConditionType } from '../conditionType';
import { DataServiceCondition } from 'src/app/utils/condition_data_service';
import { LocalParameter } from '../../new-test.component';

@Component({
  selector: 'app-new-condition',
  templateUrl: './new-condition.component.html',
  styleUrls: ['./new-condition.component.scss']
})
export class NewConditionComponent implements OnInit {

  public condition_unique_key: string;
  public parentRef: ConditionsComponent;
  
  myForm: FormGroup;

  public parameters: LocalParameter[] = [];
  public firstParameters: LocalParameter[] = [];
  public secondParameters: LocalParameter[] = [];

  // public illegelFirstValue: string;
  // public illegelSecondValue: string;

  public firstValues: string[] = [];
  public secondValues: string[] = [];

  public firstType: string;
  public secondType: string;

  public firstName: string;
  public secondName: string;

  // conditions: ConditionType[];
  conditions: string[] = ["When", "When Not"];

  integerArithmetics: string[] = ["Equal", "Greater Than", "Less Than", "Not Equal"];
  stringBooleanArithmetics: string[] = ["Equal", "Not Equal"];

  firstArithmetics: string[] = [];
  secondArithmetics: string[] = [];

  constructor(private _fb: FormBuilder, private _conditions_data: DataServiceCondition) { }

  ngOnInit(): void {
    // this._conditions_data.getConditions(); 
    // this.pullConditionsFromProvider();
    this.myForm = this._fb.group({
      firstParameter: ['', Validators.compose([Validators.required])],
      secondParameter: ['', Validators.compose([Validators.required])],
      condition: ['', Validators.compose([Validators.required])],
      firstArithmetic: ['', Validators.compose([Validators.required])],
      secondArithmetic: ['', Validators.compose([Validators.required])],
      firstValue: ['', Validators.compose([Validators.required])],
      secondValue: ['', Validators.compose([Validators.required])]})
    this.parameters = this.parentRef.parameters;
    this.firstParameters = this.parentRef.parameters;
    this.secondParameters = this.parentRef.parameters;
  }

  // private pullConditionsFromProvider(): void {
  //   this._conditions_data.currentConditions.subscribe(conditions => this.conditions = conditions);    
  // }

  // verifyConditionParameters(): void {
    // this.firstParameters = this.parameters.filter(
    //   parameter => parameter.name !== this.illegelFirstValue
    // );
    // this.secondParameters = this.parameters.filter(
    //   parameter => parameter.name !== this.illegelSecondValue
    // );
  // }

  get condition(): AbstractControl {
    return this.myForm.get('condition');
  }

  get conditionToString(): string {
    return this.condition.value;
  }

  set conditionToNewString(condition: string) {
    this.condition.setValue(condition);
  }

  get firstParameter(): AbstractControl {
    return this.myForm.get('firstParameter');
  }

  get firstParameterNameToString(): string {
    return this.firstParameter.value;
  }

  set firstParameterNameToNewString(firstParameter: string) {    
    this.firstParameter.setValue(firstParameter);
  }

  get secondParameter(): AbstractControl {
    return this.myForm.get('secondParameter');
  }

  get secondParameterNameToString(): string {
    return this.secondParameter.value;
  }

  set secondParameterNameToNewString(secondParameter: string) {    
    this.secondParameter.setValue(secondParameter);
  }

  get firstArithmetic(): AbstractControl {
    return this.myForm.get('firstArithmetic');
  }

  get firstArithmeticNameToString(): string {
    return this.firstArithmetic.value;
  }

  set firstArithmeticNameToNewString(firstArithmetic: string) {    
    this.firstArithmetic.setValue(firstArithmetic);
  }

  get secondArithmetic(): AbstractControl {
    return this.myForm.get('secondArithmetic');
  }

  get secondArithmeticNameToString(): string {
    return this.secondArithmetic.value;
  }

  set secondArithmeticNameToNewString(secondArithmetic: string) {    
    this.secondArithmetic.setValue(secondArithmetic);
  }

  get firstValue(): AbstractControl {
    return this.myForm.get('firstValue');
  }

  get firstValueNameToString(): string {
    return this.firstValue.value;
  }

  set firstValueNameToNewString(firstValue: string) {    
    this.firstValue.setValue(firstValue);
  }

  get secondValue(): AbstractControl {
    return this.myForm.get('secondValue');
  }

  get secondValueNameToString(): string {
    return this.secondValue.value;
  }

  set secondValueNameToNewString(secondValue: string) {    
    this.secondValue.setValue(secondValue);
  }

  // removeItem(position: string, parameterName: string): void {
  //   this.filterParameter(position, parameterName);
  //   this.setValues(position, parameterName);
  // }

  public filterParameter(position: string, parameterName: string): void {
    if(position === 'first') {
      this.secondParameters = this.parameters.filter(
        parameter => parameter.name !== parameterName
      );
    } else {
      this.firstParameters = this.parameters.filter(
        parameter => parameter.name !== parameterName
      );
    }
  }

  public setValues(position: string, parameterName: string): void {
    for(let parameter of this.parameters) {
      if(parameter.name === parameterName) {
        if(position === 'first') {
          if(parameter.type === "Integer") {
            this.setRangeValues('first', parameter.from, parameter.to);
          } else {
            this.firstValues = parameter.values;
          }
        } else {
          if(parameter.type === "Integer") {
            this.setRangeValues('second', parameter.from, parameter.to);
          } else {
            this.secondValues = parameter.values;
          }
        }
        break;
      }
    }
  }

  private setRangeValues(position: string, from: string, to: string): void {
    if(position === 'first') {
      for(let i = Number(from) ; i <= Number(to) ; i++) {
        this.firstValues.push(String(i));
      }
    } else {
      for(let i = Number(from) ; i <= Number(to) ; i++) {
        this.secondValues.push(String(i));
      }
    }
  }

  public setType(position: string, parameterName: string): void {
    for(let parameter of this.parameters) {
      if(parameter.name === parameterName) {
        if(position === 'first') {
          this.firstType = parameter.type;
          this.updateArithmetics('first');          
        } else {
          this.secondType = parameter.type;
          this.updateArithmetics('second');  
        }
        break;
      }
    }
  }

  public setName(position: string, parameterName: string) : void {
    for(let parameter of this.parameters) {
      if(parameter.name === parameterName) {
        if(position === 'first') {
          this.firstName = parameterName;
        } else {
          this.secondName = parameterName;
        }
        break;
      }
    }
  }

  private updateArithmetics(position: string) {
    if(position === 'first') {
        if(this.firstType === 'Integer') {
          this.firstArithmetics = this.integerArithmetics;
        } else {
          this.firstArithmetics = this.stringBooleanArithmetics;
        }
    } else {
      if(this.secondType === 'Integer') {
        this.secondArithmetics = this.integerArithmetics;
      } else {
        this.secondArithmetics = this.stringBooleanArithmetics;
      }
    }
  }

  removeCondition() {
    this.parentRef.removeCondition(this.condition_unique_key);
  }

  // updateParameterNames(previous: string, next: string) {    
  //   for(let i = 0 ; i < this.parameters.length ; i++) {
  //     if(this.parameters[i].name === previous) {
  //       this.parameters[i].name = next;        
  //       break;
  //     }
  //   }
  //   if(this.firstParameterNameToString === previous) {
  //     this.firstParameterNameToNewString = next;
  //     for(let i = 0 ; i < this.firstParameters.length ; i++) {
  //       if(this.firstParameters[i].name === previous) {
  //         this.firstParameters[i].name = next;
  //         this.firstValues = this.firstParameters[i].values;
  //         break;
  //       }
  //     }
      
  //   }    
  //   if(this.secondParameterNameToString === previous) {
  //     this.secondParameterNameToNewString = next;
  //     for(let i = 0 ; i < this.secondParameters.length ; i++) {
  //       if(this.secondParameters[i].name === previous) {
  //         this.secondParameters[i].name = next;
  //         this.secondValues = this.secondParameters[i].values;
  //         break;
  //       }
  //     }
  //   }    
  // }

  updateConditionByParameterName(previous: string, next: string) {
    if(this.firstName === previous) {
      this.firstName = next;
    }
    if(this.secondName === previous) {
      this.secondName = next;
    }
  }

  removeConditionByParameterName(previous: string) {   
    if(this.firstName === previous) {
      this.removeCondition();
    }
    if(this.secondName === previous) {
      this.removeCondition();
    }
  }
}
