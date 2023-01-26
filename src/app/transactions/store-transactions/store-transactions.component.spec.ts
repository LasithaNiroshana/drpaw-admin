import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTransactionsComponent } from './store-transactions.component';

describe('StoreTransactionsComponent', () => {
  let component: StoreTransactionsComponent;
  let fixture: ComponentFixture<StoreTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
