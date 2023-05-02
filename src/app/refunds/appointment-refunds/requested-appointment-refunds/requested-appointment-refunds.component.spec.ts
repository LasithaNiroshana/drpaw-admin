import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedAppointmentRefundsComponent } from './requested-appointment-refunds.component';

describe('RequestedAppointmentRefundsComponent', () => {
  let component: RequestedAppointmentRefundsComponent;
  let fixture: ComponentFixture<RequestedAppointmentRefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestedAppointmentRefundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestedAppointmentRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
