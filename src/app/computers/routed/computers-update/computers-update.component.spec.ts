import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputersUpdateComponent } from './computers-update.component';

describe('ComputersUpdateComponent', () => {
  let component: ComputersUpdateComponent;
  let fixture: ComponentFixture<ComputersUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputersUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
