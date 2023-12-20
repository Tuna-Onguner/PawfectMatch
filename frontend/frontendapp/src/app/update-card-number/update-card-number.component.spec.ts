import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCardNumberComponent } from './update-card-number.component';

describe('UpdateCardNumberComponent', () => {
  let component: UpdateCardNumberComponent;
  let fixture: ComponentFixture<UpdateCardNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCardNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCardNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
