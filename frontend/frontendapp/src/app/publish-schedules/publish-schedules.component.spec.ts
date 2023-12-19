import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishSchedulesComponent } from './publish-schedules.component';

describe('PublishSchedulesComponent', () => {
  let component: PublishSchedulesComponent;
  let fixture: ComponentFixture<PublishSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishSchedulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublishSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
