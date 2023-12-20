import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCreatePageComponent } from './blog-create-page.component';

describe('BlogCreatePageComponent', () => {
  let component: BlogCreatePageComponent;
  let fixture: ComponentFixture<BlogCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCreatePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
