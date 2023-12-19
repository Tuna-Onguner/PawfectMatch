import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindVeterinariansComponent } from './find-veterinarians.component';

describe('FindVeterinariansComponent', () => {
  let component: FindVeterinariansComponent;
  let fixture: ComponentFixture<FindVeterinariansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindVeterinariansComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindVeterinariansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
