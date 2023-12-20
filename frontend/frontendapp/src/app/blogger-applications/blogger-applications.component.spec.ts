import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggerApplicationsComponent } from './blogger-applications.component';

describe('BloggerApplicationsComponent', () => {
  let component: BloggerApplicationsComponent;
  let fixture: ComponentFixture<BloggerApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloggerApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BloggerApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
