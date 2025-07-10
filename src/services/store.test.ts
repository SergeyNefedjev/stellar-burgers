import { rootReducer } from './store';
import { initialState as combinationState } from './slices/constructor-slice';
import { initialState as ingredientsState } from './slices/ingredients-slice';
import { initialState as orderState } from './slices/order-slice';
import { initialState as userState } from './slices/user-slice';
import { initialState as feedsState } from './slices/feeds-slice';

describe('rootReducer', () => {
  it('Тест на возврат исходного состояния', () => {
    expect(rootReducer(undefined, { type: 'unknown' })).toEqual({
      combination: combinationState,
      ingredients: ingredientsState,
      order: orderState,
      user: userState,
      feeds: feedsState
    });
  });
});
