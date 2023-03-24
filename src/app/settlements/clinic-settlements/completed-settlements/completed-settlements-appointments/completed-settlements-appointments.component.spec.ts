import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedSettlementsAppointmentsComponent } from './completed-settlements-appointments.component';

describe('CompletedSettlementsAppointmentsComponent', () => {
  let component: CompletedSettlementsAppointmentsComponent;
  let fixture: ComponentFixture<CompletedSettlementsAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedSettlementsAppointmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedSettlementsAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
