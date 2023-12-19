import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VetViewPageComponent } from './vet-view-page.component';

describe('VetViewPageComponent', () => {
  let component: VetViewPageComponent;
  let fixture: ComponentFixture<VetViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VetViewPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VetViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
