import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicSettlementsInfoComponent } from './clinic-settlements-info.component';

describe('ClinicSettlementsInfoComponent', () => {
  let component: ClinicSettlementsInfoComponent;
  let fixture: ComponentFixture<ClinicSettlementsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicSettlementsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicSettlementsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
