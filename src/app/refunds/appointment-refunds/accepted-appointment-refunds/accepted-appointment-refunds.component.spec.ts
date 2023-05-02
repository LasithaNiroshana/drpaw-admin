import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedAppointmentRefundsComponent } from './accepted-appointment-refunds.component';

describe('AcceptedAppointmentRefundsComponent', () => {
  let component: AcceptedAppointmentRefundsComponent;
  let fixture: ComponentFixture<AcceptedAppointmentRefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptedAppointmentRefundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceptedAppointmentRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
