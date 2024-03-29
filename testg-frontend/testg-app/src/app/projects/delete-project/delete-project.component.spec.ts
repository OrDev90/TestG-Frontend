import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeleteProjectComponent } from './delete-project.component';

describe('DeleteProjectComponent', () => {
  let component: DeleteProjectComponent;
  let fixture: ComponentFixture<DeleteProjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
