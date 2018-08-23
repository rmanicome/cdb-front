import { ComputersRoutingModule } from './computers-routing.module';

describe('ComputersRoutingModule', () => {
  let computersRoutingModule: ComputersRoutingModule;

  beforeEach(() => {
    computersRoutingModule = new ComputersRoutingModule();
  });

  it('should create an instance', () => {
    expect(computersRoutingModule).toBeTruthy();
  });
});
