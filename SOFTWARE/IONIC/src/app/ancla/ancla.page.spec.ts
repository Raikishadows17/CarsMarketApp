import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnclaPage } from './ancla.page';

describe('AnclaPage', () => {
  let component: AnclaPage;
  let fixture: ComponentFixture<AnclaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnclaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnclaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
