import { TestBed } from '@angular/core/testing';

import { EasyAuthService } from './easy-auth.service';

describe('EasyAuthService', () => {
  let service: EasyAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EasyAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
