import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectViewModalComponent } from './project-view-modal.component';

describe('ProjectViewModalComponent', () => {
  let component: ProjectViewModalComponent;
  let fixture: ComponentFixture<ProjectViewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectViewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
