import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaVentasComponent } from './area-ventas.component';

describe('AreaVentasComponent', () => {
  let component: AreaVentasComponent;
  let fixture: ComponentFixture<AreaVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaVentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
