import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebageComponent } from './homebage.component';

describe('HomebageComponent', () => {
  let component: HomebageComponent;
  let fixture: ComponentFixture<HomebageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
