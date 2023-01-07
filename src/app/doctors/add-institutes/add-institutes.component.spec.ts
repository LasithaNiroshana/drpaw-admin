import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstitutesComponent } from './add-institutes.component';

describe('AddInstitutesComponent', () => {
  let component: AddInstitutesComponent;
  let fixture: ComponentFixture<AddInstitutesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInstitutesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddInstitutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
