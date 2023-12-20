import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertAdvicePageComponent } from './expert-advice-page.component';

describe('ExpertAdvicePageComponent', () => {
  let component: ExpertAdvicePageComponent;
  let fixture: ComponentFixture<ExpertAdvicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertAdvicePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpertAdvicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
