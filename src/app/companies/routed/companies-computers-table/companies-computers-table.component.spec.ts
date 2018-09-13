import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesComputersTableComponent } from './companies-computers-table.component';

describe('CompaniesComputersTableComponent', () => {
  let component: CompaniesComputersTableComponent;
  let fixture: ComponentFixture<CompaniesComputersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesComputersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesComputersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
