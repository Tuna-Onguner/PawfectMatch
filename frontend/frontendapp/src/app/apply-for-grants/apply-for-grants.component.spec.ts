import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyForGrantsComponent } from './apply-for-grants.component';

describe('ApplyForGrantsComponent', () => {
  let component: ApplyForGrantsComponent;
  let fixture: ComponentFixture<ApplyForGrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyForGrantsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyForGrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
