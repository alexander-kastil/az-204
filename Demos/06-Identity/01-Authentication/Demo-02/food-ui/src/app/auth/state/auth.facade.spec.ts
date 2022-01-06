import { TestBed } from '@angular/core/testing';
import { MsalAuthFacade } from './auth.facade';

describe('AuthService', () => {
  let service: MsalAuthFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsalAuthFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
