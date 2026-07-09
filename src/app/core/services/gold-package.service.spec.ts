import { TestBed } from '@angular/core/testing';

import { GoldPackageService } from './gold-package.service';

describe('GoldPackageService', () => {
  let service: GoldPackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoldPackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
