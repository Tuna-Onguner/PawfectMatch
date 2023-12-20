import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOverseeComponent } from './detail-oversee.component';

describe('DetailOverseeComponent', () => {
  let component: DetailOverseeComponent;
  let fixture: ComponentFixture<DetailOverseeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailOverseeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailOverseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
