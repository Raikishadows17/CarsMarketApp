import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendidoPage } from './vendido.page';

describe('VendidoPage', () => {
  let component: VendidoPage;
  let fixture: ComponentFixture<VendidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
