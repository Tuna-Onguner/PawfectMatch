import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnedPetsViewComponent } from './owned-pets-view.component';

describe('OwnedPetsViewComponent', () => {
  let component: OwnedPetsViewComponent;
  let fixture: ComponentFixture<OwnedPetsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnedPetsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnedPetsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
