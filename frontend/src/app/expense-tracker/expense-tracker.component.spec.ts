import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseTrackerComponent } from './expense-tracker.component';

describe('ExpenseTrackerComponent', () => {
  let component: ExpenseTrackerComponent;
  let fixture: ComponentFixture<ExpenseTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
