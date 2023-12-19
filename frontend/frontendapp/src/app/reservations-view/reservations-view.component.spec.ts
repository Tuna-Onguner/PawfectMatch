import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsViewComponent } from './reservations-view.component';

describe('ReservationsViewComponent', () => {
  let component: ReservationsViewComponent;
  let fixture: ComponentFixture<ReservationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
