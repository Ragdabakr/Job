import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookmarksEmployeeComponent } from './manage-bookmarks-employee.component';

describe('ManageBookmarksEmployeeComponent', () => {
  let component: ManageBookmarksEmployeeComponent;
  let fixture: ComponentFixture<ManageBookmarksEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBookmarksEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBookmarksEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
