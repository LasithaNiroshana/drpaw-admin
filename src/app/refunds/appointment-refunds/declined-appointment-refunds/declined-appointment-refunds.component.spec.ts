import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedAppointmentRefundsComponent } from './declined-appointment-refunds.component';

describe('DeclinedAppointmentRefundsComponent', () => {
  let component: DeclinedAppointmentRefundsComponent;
  let fixture: ComponentFixture<DeclinedAppointmentRefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclinedAppointmentRefundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclinedAppointmentRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
