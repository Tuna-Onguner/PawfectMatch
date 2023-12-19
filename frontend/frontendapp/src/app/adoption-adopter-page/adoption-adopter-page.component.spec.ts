import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionAdopterPageComponent } from './adoption-adopter-page.component';

describe('AdoptionAdopterPageComponent', () => {
  let component: AdoptionAdopterPageComponent;
  let fixture: ComponentFixture<AdoptionAdopterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionAdopterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptionAdopterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
