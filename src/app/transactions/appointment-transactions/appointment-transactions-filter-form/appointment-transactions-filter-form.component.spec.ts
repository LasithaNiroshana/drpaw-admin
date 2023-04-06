import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTransactionsFilterFormComponent } from './appointment-transactions-filter-form.component';

describe('AppointmentTransactionsFilterFormComponent', () => {
  let component: AppointmentTransactionsFilterFormComponent;
  let fixture: ComponentFixture<AppointmentTransactionsFilterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentTransactionsFilterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentTransactionsFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
