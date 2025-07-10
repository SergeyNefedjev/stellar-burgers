import reducer, { fetchIngredients, initialState } from './ingredients-slice';

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
    _id: '643d69a5c3f7b9001cfa093f',
    name: 'Мясо бессмертных моллюсков Protostomia',
    type: 'main',
    proteins: 433,
    fat: 244,
    carbohydrates: 33,
    calories: 420,
    price: 1337,
    image: 'https://code.s3.yandex.net/react/code/meat-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
    __v: 0
  }
];

describe('ingredients-slice', () => {
  it('should handle fetchIngredients.pending', () => {
    const state = reducer(
      initialState,
      fetchIngredients.pending('fetchIngredients.pending')
    );
    expect(state.isLoading).toEqual(true);
  });
  it('should handle fetchIngredients.fulfilled', async () => {
    const state = reducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, 'fetchIngredients.fulfilled')
    );
    expect(state.isLoading).toEqual(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });
  it('should handle fetchIngredients.rejected', async () => {
    const state = reducer(
      initialState,
      fetchIngredients.rejected(
        new Error('Error fetching ingredients'),
        'fetchIngredients.rejected'
      )
    );
    expect(state.isLoading).toEqual(false);
    expect(state.hasError).toEqual(true);
    expect(state.error).toEqual('Error fetching ingredients');
  });
});
