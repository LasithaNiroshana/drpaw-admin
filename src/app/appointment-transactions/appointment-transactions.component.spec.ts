import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTransactionsComponent } from './appointment-transactions.component';

describe('AppointmentTransactionsComponent', () => {
  let component: AppointmentTransactionsComponent;
  let fixture: ComponentFixture<AppointmentTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
