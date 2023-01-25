import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesModalComponent } from './lotes-modal.component';

describe('LotesModalComponent', () => {
  let component: LotesModalComponent;
  let fixture: ComponentFixture<LotesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LotesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
