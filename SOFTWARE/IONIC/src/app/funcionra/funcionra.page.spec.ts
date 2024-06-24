import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionraPage } from './funcionra.page';

describe('FuncionraPage', () => {
  let component: FuncionraPage;
  let fixture: ComponentFixture<FuncionraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuncionraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuncionraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
