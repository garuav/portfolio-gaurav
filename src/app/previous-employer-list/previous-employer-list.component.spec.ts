import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousEmployerListComponent } from './previous-employer-list.component';

describe('PreviousEmployerListComponent', () => {
  let component: PreviousEmployerListComponent;
  let fixture: ComponentFixture<PreviousEmployerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousEmployerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousEmployerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
