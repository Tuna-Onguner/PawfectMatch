import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogReadPageComponent } from './blog-read-page.component';

describe('BlogReadPageComponent', () => {
  let component: BlogReadPageComponent;
  let fixture: ComponentFixture<BlogReadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogReadPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogReadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
