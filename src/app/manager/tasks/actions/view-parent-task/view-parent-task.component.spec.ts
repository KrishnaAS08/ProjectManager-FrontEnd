import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewParentTaskComponent } from './view-parent-task.component';

describe('ViewParentTaskComponent', () => {
  let component: ViewParentTaskComponent;
  let fixture: ComponentFixture<ViewParentTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewParentTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewParentTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
