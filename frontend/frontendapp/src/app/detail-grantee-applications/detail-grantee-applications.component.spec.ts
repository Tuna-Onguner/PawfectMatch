import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGranteeApplicationsComponent } from './detail-grantee-applications.component';

describe('DetailGranteeApplicationsComponent', () => {
  let component: DetailGranteeApplicationsComponent;
  let fixture: ComponentFixture<DetailGranteeApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailGranteeApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailGranteeApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
