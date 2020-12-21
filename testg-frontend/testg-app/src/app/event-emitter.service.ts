import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeCreateCondition  = new EventEmitter();
  createConditionSub: Subscription;

  invokeRemoveAllConditions  = new EventEmitter();
  removeAllConditionsSub: Subscription;

  invokeUpdateStringsConditionsList = new EventEmitter();
  updateStringsConditionsListSub: Subscription;

  invokeRemoveEmptyStringsConditionsList = new EventEmitter();
  removeEmptyStringsConditionsListSub: Subscription;

  invokeRemoveDeletedParameterConditionsList = new EventEmitter();
  removeDeletedParameterConditionsListSub: Subscription;

  invokeSetConditionsList = new EventEmitter();
  setConditionsListSub: Subscription;

  constructor() { }

  createCondition(): void {
    this.invokeCreateCondition.emit();
  }

  removeAllConditions(): void {
    this.invokeRemoveAllConditions.emit();
  }

  updateStringsConditionsList(): void {
    this.invokeUpdateStringsConditionsList.emit();
  }

  removeEmptyStringsConditionsList(): void {
    this.invokeRemoveEmptyStringsConditionsList.emit();
  }

  removeDeletedParameterConditionsList(): void {
    this.invokeRemoveDeletedParameterConditionsList.emit();
  }

  setConditionsList(): void {
    this.invokeSetConditionsList.emit();
  }
}
