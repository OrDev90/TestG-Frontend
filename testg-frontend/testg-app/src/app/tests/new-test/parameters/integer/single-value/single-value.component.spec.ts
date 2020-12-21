import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SingleValueComponent } from './single-value.component';

describe('SingleValueComponent', () => {
  let component: SingleValueComponent;
  let fixture: ComponentFixture<SingleValueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
