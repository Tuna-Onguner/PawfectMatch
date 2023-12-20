import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadExamResultsComponent } from './upload-exam-results.component';

describe('UploadExamResultsComponent', () => {
  let component: UploadExamResultsComponent;
  let fixture: ComponentFixture<UploadExamResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadExamResultsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadExamResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
