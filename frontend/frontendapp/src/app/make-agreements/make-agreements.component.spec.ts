import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAgreementsComponent } from './make-agreements.component';

describe('MakeAgreementsComponent', () => {
  let component: MakeAgreementsComponent;
  let fixture: ComponentFixture<MakeAgreementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeAgreementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MakeAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
