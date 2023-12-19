import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveDonationsComponent } from './receive-donations.component';

describe('ReceiveDonationsComponent', () => {
  let component: ReceiveDonationsComponent;
  let fixture: ComponentFixture<ReceiveDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiveDonationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiveDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
