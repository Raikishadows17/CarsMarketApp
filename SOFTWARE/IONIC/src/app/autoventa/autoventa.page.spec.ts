import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoventaPage } from './autoventa.page';

describe('AutoventaPage', () => {
  let component: AutoventaPage;
  let fixture: ComponentFixture<AutoventaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoventaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoventaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
