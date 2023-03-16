import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPaidSettlementsComponent } from './not-paid-settlements.component';

describe('NotPaidSettlementsComponent', () => {
  let component: NotPaidSettlementsComponent;
  let fixture: ComponentFixture<NotPaidSettlementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotPaidSettlementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotPaidSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
