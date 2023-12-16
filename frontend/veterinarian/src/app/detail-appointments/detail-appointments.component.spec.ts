import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAppointmentsComponent } from './detail-appointments.component';

describe('DetailAppointmentsComponent', () => {
  let component: DetailAppointmentsComponent;
  let fixture: ComponentFixture<DetailAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAppointmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
