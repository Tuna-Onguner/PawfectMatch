import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAdopterPageComponent } from './main-adopter-page.component';

describe('MainAdopterPageComponent', () => {
  let component: MainAdopterPageComponent;
  let fixture: ComponentFixture<MainAdopterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainAdopterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainAdopterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
