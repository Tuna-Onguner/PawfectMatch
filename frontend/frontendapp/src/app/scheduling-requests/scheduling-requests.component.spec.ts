import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingRequestsComponent } from './scheduling-requests.component';

describe('SchedulingRequestsComponent', () => {
  let component: SchedulingRequestsComponent;
  let fixture: ComponentFixture<SchedulingRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchedulingRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
