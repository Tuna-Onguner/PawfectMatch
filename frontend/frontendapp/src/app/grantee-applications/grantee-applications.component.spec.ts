import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GranteeApplicationsComponent } from './grantee-applications.component';

describe('GranteeApplicationsComponent', () => {
  let component: GranteeApplicationsComponent;
  let fixture: ComponentFixture<GranteeApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GranteeApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GranteeApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
