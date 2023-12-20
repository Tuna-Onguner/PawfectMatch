import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsViewComponent } from './applications-view.component';

describe('ApplicationsViewComponent', () => {
  let component: ApplicationsViewComponent;
  let fixture: ComponentFixture<ApplicationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
