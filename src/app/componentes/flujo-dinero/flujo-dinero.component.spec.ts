import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlujoDineroComponent } from './flujo-dinero.component';

describe('FlujoDineroComponent', () => {
  let component: FlujoDineroComponent;
  let fixture: ComponentFixture<FlujoDineroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlujoDineroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlujoDineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
