import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedSettlementsComponent } from './completed-settlements.component';

describe('CompletedSettlementsComponent', () => {
  let component: CompletedSettlementsComponent;
  let fixture: ComponentFixture<CompletedSettlementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedSettlementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedSettlementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
