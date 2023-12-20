import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAdoptionApplicationComponent } from './detail-adoption-application.component';

describe('DetailAdoptionApplicationComponent', () => {
  let component: DetailAdoptionApplicationComponent;
  let fixture: ComponentFixture<DetailAdoptionApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAdoptionApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAdoptionApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
