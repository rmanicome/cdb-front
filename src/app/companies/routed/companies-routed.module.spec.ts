import { CompaniesRoutedModule } from './companies-routed.module';

describe('CompaniesRoutedModule', () => {
  let companiesRoutedModule: CompaniesRoutedModule;

  beforeEach(() => {
    companiesRoutedModule = new CompaniesRoutedModule();
  });

  it('should create an instance', () => {
    expect(companiesRoutedModule).toBeTruthy();
  });
});
