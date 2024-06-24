import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NcarroPage } from './ncarro.page';

describe('NcarroPage', () => {
  let component: NcarroPage;
  let fixture: ComponentFixture<NcarroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NcarroPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NcarroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
