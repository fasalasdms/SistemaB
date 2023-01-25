import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaAnunciosComponent } from './area-anuncios.component';

describe('AreaAnunciosComponent', () => {
  let component: AreaAnunciosComponent;
  let fixture: ComponentFixture<AreaAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaAnunciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
