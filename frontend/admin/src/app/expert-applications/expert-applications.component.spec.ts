import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertApplicationsComponent } from './expert-applications.component';

describe('ExpertApplicationsComponent', () => {
  let component: ExpertApplicationsComponent;
  let fixture: ComponentFixture<ExpertApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
