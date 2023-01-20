import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTransactionsComponent } from './service-transactions.component';

describe('ServiceTransactionsComponent', () => {
  let component: ServiceTransactionsComponent;
  let fixture: ComponentFixture<ServiceTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
