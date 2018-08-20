import { ComputersModule } from './computers.module';

describe('ComputersModule', () => {
  let computersModule: ComputersModule;

  beforeEach(() => {
    computersModule = new ComputersModule();
  });

  it('should create an instance', () => {
    expect(computersModule).toBeTruthy();
  });
});
