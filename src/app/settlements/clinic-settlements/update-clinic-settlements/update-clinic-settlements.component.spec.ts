import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClinicSettlementsComponent } from './update-clinic-settlements.component';

describe('UpdateClinicSettlementsComponent', () => {
  let component: UpdateClinicSettlementsComponent;
  let fixture: ComponentFixture<UpdateClinicSettlementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateClinicSettlementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateClinicSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
