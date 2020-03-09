import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsWorkedComponent } from './projects-worked.component';

describe('ProjectsWorkedComponent', () => {
  let component: ProjectsWorkedComponent;
  let fixture: ComponentFixture<ProjectsWorkedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsWorkedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsWorkedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
