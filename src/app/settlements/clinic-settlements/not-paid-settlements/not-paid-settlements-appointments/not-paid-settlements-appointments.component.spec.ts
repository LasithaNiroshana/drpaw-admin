import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPaidSettlementsAppointmentsComponent } from './not-paid-settlements-appointments.component';

describe('NotPaidSettlementsAppointmentsComponent', () => {
  let component: NotPaidSettlementsAppointmentsComponent;
  let fixture: ComponentFixture<NotPaidSettlementsAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotPaidSettlementsAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotPaidSettlementsAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
