import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfileEmployeeComponent } from './manage-profile-employee.component';

describe('ManageProfileEmployeeComponent', () => {
  let component: ManageProfileEmployeeComponent;
  let fixture: ComponentFixture<ManageProfileEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProfileEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProfileEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
