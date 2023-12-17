import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVetAgreementComponent } from './detail-vet-agreement.component';

describe('DetailVetAgreementComponent', () => {
  let component: DetailVetAgreementComponent;
  let fixture: ComponentFixture<DetailVetAgreementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailVetAgreementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailVetAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
