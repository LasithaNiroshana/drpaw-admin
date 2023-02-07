import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicSettlementsComponent } from './clinic-settlements.component';

describe('ClinicSettlementsComponent', () => {
  let component: ClinicSettlementsComponent;
  let fixture: ComponentFixture<ClinicSettlementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicSettlementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
