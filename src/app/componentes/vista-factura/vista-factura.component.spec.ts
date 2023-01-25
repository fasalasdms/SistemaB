import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaFacturaComponent } from './vista-factura.component';

describe('VistaFacturaComponent', () => {
  let component: VistaFacturaComponent;
  let fixture: ComponentFixture<VistaFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
