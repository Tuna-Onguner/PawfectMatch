import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferringDonationsComponent } from './transferring-donations.component';

describe('TransferringDonationsComponent', () => {
  let component: TransferringDonationsComponent;
  let fixture: ComponentFixture<TransferringDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferringDonationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransferringDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
