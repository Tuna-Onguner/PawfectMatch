import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPetDialogComponent } from './register-pet-dialog.component';

describe('RegisterPetDialogComponent', () => {
  let component: RegisterPetDialogComponent;
  let fixture: ComponentFixture<RegisterPetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPetDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterPetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
