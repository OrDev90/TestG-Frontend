import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewConditionComponent } from './new-condition.component';

describe('NewConditionComponent', () => {
  let component: NewConditionComponent;
  let fixture: ComponentFixture<NewConditionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
