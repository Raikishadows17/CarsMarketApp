import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecupcontraPage } from './recupcontra.page';

describe('RecupcontraPage', () => {
  let component: RecupcontraPage;
  let fixture: ComponentFixture<RecupcontraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecupcontraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecupcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
