import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAddingSettlementrefComponent } from './confirm-adding-settlementref.component';

describe('ConfirmAddingSettlementrefComponent', () => {
  let component: ConfirmAddingSettlementrefComponent;
  let fixture: ComponentFixture<ConfirmAddingSettlementrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAddingSettlementrefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAddingSettlementrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
