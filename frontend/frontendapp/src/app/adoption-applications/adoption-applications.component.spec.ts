import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionApplicationsComponent } from './adoption-applications.component';

describe('AdoptionApplicationsComponent', () => {
  let component: AdoptionApplicationsComponent;
  let fixture: ComponentFixture<AdoptionApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptionApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
