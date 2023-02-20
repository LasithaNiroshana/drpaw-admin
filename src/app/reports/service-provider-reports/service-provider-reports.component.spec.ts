import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderReportsComponent } from './service-provider-reports.component';

describe('ServiceProviderReportsComponent', () => {
  let component: ServiceProviderReportsComponent;
  let fixture: ComponentFixture<ServiceProviderReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceProviderReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceProviderReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
