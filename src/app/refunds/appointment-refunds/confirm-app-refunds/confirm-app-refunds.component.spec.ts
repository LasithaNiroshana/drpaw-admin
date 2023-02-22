import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAppRefundsComponent } from './confirm-app-refunds.component';

describe('ConfirmAppRefundsComponent', () => {
  let component: ConfirmAppRefundsComponent;
  let fixture: ComponentFixture<ConfirmAppRefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAppRefundsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAppRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
