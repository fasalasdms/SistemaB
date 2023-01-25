import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosModalComponent } from './puntos-modal.component';

describe('PuntosModalComponent', () => {
  let component: PuntosModalComponent;
  let fixture: ComponentFixture<PuntosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntosModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
