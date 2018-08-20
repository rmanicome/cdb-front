import { TestBed, inject } from '@angular/core/testing';

import { ComputersService } from './computers.service';

describe('ComputersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComputersService]
    });
  });

  it('should be created', inject([ComputersService], (service: ComputersService) => {
    expect(service).toBeTruthy();
  }));
});
