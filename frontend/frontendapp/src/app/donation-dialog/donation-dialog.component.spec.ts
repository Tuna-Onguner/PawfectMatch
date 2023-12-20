import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationDialogComponent } from './donation-dialog.component';

describe('DonationDialogComponent', () => {
  let component: DonationDialogComponent;
  let fixture: ComponentFixture<DonationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
