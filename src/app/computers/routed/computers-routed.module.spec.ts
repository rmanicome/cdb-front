import { ComputersRoutedModule } from './computers-routed.module';

describe('ComputersRoutedModule', () => {
  let computersRoutedModule: ComputersRoutedModule;

  beforeEach(() => {
    computersRoutedModule = new ComputersRoutedModule();
  });

  it('should create an instance', () => {
    expect(computersRoutedModule).toBeTruthy();
  });
});
