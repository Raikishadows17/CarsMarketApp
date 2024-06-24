import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealidadaumentadaPage } from './realidadaumentada.page';

describe('RealidadaumentadaPage', () => {
  let component: RealidadaumentadaPage;
  let fixture: ComponentFixture<RealidadaumentadaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealidadaumentadaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealidadaumentadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
