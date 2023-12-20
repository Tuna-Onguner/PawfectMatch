import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDialogComponent } from './blog-dialog.component';

describe('BlogDialogComponent', () => {
  let component: BlogDialogComponent;
  let fixture: ComponentFixture<BlogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
