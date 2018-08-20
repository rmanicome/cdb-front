import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersDetailComponent } from './computers-detail.component';

describe('ComputersDetailComponent', () => {
  let component: ComputersDetailComponent;
  let fixture: ComponentFixture<ComputersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
