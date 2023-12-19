import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExamResultsComponent } from './detail-exam-results.component';

describe('DetailExamResultsComponent', () => {
  let component: DetailExamResultsComponent;
  let fixture: ComponentFixture<DetailExamResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailExamResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailExamResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
