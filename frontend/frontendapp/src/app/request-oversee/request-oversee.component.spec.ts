import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestOverseeComponent } from './request-oversee.component';

describe('RequestOverseeComponent', () => {
  let component: RequestOverseeComponent;
  let fixture: ComponentFixture<RequestOverseeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestOverseeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestOverseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
