import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAccordionComponent } from './panel-accordion.component';

describe('PanelAccordionComponent', () => {
  let component: PanelAccordionComponent;
  let fixture: ComponentFixture<PanelAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
