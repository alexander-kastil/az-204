import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { FoodEffects } from './food.effects';

describe('FoodEffects', () => {
  let actions$: Observable<any>;
  let effects: FoodEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FoodEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get<FoodEffects>(FoodEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
