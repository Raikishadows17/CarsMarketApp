import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoraPage } from './videora.page';

describe('VideoraPage', () => {
  let component: VideoraPage;
  let fixture: ComponentFixture<VideoraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
