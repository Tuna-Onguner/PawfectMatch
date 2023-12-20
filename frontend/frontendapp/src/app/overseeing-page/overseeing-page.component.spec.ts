import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverseeingPageComponent } from './overseeing-page.component';

describe('OverseeingPageComponent', () => {
  let component: OverseeingPageComponent;
  let fixture: ComponentFixture<OverseeingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverseeingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverseeingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
