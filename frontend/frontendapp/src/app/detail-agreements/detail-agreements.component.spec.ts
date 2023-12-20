import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAgreementsComponent } from './detail-agreements.component';

describe('DetailAgreementsComponent', () => {
  let component: DetailAgreementsComponent;
  let fixture: ComponentFixture<DetailAgreementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAgreementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAgreementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
