import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditautosPage } from './editautos.page';

describe('EditautosPage', () => {
  let component: EditautosPage;
  let fixture: ComponentFixture<EditautosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditautosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditautosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
