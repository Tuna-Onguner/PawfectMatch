import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPetComponent } from './detail-pet.component';

describe('DetailPetComponent', () => {
  let component: DetailPetComponent;
  let fixture: ComponentFixture<DetailPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
