import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersAddComponent } from './computers-add.component';

describe('ComputersAddComponent', () => {
  let component: ComputersAddComponent;
  let fixture: ComponentFixture<ComputersAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputersAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
