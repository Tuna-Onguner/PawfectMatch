import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGrantApplicationsComponent } from './detail-grant-applications.component';

describe('DetailGrantApplicationsComponent', () => {
  let component: DetailGrantApplicationsComponent;
  let fixture: ComponentFixture<DetailGrantApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailGrantApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailGrantApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
