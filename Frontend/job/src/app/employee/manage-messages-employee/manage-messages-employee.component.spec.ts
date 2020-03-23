import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMessagesEmployeeComponent } from './manage-messages-employee.component';

describe('ManageMessagesEmployeeComponent', () => {
  let component: ManageMessagesEmployeeComponent;
  let fixture: ComponentFixture<ManageMessagesEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMessagesEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMessagesEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
