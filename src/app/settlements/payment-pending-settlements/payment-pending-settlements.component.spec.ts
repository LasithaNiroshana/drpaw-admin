import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPendingSettlementsComponent } from './payment-pending-settlements.component';

describe('PaymentPendingSettlementsComponent', () => {
  let component: PaymentPendingSettlementsComponent;
  let fixture: ComponentFixture<PaymentPendingSettlementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentPendingSettlementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentPendingSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
