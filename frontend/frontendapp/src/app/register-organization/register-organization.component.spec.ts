import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOrganizationComponent } from './register-organization.component';

describe('RegisterOrganizationComponent', () => {
  let component: RegisterOrganizationComponent;
  let fixture: ComponentFixture<RegisterOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterOrganizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
