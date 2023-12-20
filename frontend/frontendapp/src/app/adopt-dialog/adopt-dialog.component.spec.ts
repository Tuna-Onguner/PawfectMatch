import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptDialogComponent } from './adopt-dialog.component';

describe('AdoptDialogComponent', () => {
  let component: AdoptDialogComponent;
  let fixture: ComponentFixture<AdoptDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdoptDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
