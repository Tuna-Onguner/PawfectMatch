import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBlogApplicationsComponent } from './detail-blog-applications.component';

describe('DetailBlogApplicationsComponent', () => {
  let component: DetailBlogApplicationsComponent;
  let fixture: ComponentFixture<DetailBlogApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBlogApplicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailBlogApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
