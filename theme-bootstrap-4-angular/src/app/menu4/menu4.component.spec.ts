import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Menu4Component } from './menu4.component';

describe('Menu4Component', () => {
  let component: Menu4Component;
  let fixture: ComponentFixture<Menu4Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Menu4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Menu4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
