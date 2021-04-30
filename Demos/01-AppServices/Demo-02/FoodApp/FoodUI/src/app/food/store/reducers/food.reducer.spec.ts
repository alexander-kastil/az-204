import { FoodReducer, initialState } from './food.reducer';

describe('Food Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = FoodReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
