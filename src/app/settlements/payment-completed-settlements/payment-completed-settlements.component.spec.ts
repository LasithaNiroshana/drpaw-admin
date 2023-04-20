import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCompletedSettlementsComponent } from './payment-completed-settlements.component';

describe('PaymentCompletedSettlementsComponent', () => {
  let component: PaymentCompletedSettlementsComponent;
  let fixture: ComponentFixture<PaymentCompletedSettlementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCompletedSettlementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCompletedSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
