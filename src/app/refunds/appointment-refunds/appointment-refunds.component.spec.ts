import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentRefundsComponent } from './appointment-refunds.component';

describe('AppointmentRefundsComponent', () => {
  let component: AppointmentRefundsComponent;
  let fixture: ComponentFixture<AppointmentRefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentRefundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
