import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExpertApplicationsComponent } from './detail-expert-applications.component';

describe('DetailExpertApplicationsComponent', () => {
  let component: DetailExpertApplicationsComponent;
  let fixture: ComponentFixture<DetailExpertApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailExpertApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailExpertApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
