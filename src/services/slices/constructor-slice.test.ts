import { describe } from 'node:test';
import reducer, {
  initialState,
  addIngredient,
  removeIngredient,
  moveUp,
  moveDown,
  getOrder
} from './constructor-slice';

const mockBun = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0
};

const mockIngredient = {
  _id: "643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0
};

const mockOrder = {
  _id: "686e0bf15a54df001b6dd4f8",
  status: 'done',
  name: "Краторный био-марсианский бургер",
  createdAt: "2025-07-09T06:28:01.149Z",
  updatedAt: "2025-07-09T06:28:01.853Z",
  number: 83940,
  ingredients: ["643d69a5c3f7b9001cfa093c", "643d69a5c3f7b9001cfa0941"]
};

let uuidCounter = 0;
jest.mock('uuid', () => ({
  v4: () => `${++uuidCounter}`
}));

describe('constructor-slice', () => {
  beforeEach(() => {
    uuidCounter = 0;
  });
  it('should add ingredient', () => {
    const addBunState = reducer(initialState, addIngredient(mockBun));
    const addIngredientState = reducer(
      initialState,
      addIngredient(mockIngredient)
    );
    expect(addBunState.combination.bun).toEqual({
      ...mockBun,
      id: '1'
    });
    expect(addIngredientState.combination.ingredients).toEqual([
      {
        ...mockIngredient,
        id: '2'
      }
    ]);
  });
  it('should remove ingredient', () => {
    const addIngredientState = reducer(
      initialState,
      addIngredient(mockIngredient)
    );
    const ingredientWithId = {
      ...mockIngredient,
      id: '1'
    };
    const removeIngredientState = reducer(
      addIngredientState,
      removeIngredient(ingredientWithId)
    );
    expect(addIngredientState.combination.ingredients).toEqual([
      {
        ...mockIngredient,
        id: '1'
      }
    ]);
    expect(removeIngredientState.combination.ingredients).toEqual([]);
  });
  it('should move ingredient', () => {
    let addIngredientState = reducer(
      initialState,
      addIngredient(mockIngredient)
    );
    addIngredientState = reducer(
      addIngredientState,
      addIngredient(mockIngredient)
    );
    const ingredients = [
      {
        ...mockIngredient,
        id: '1'
      },
      {
        ...mockIngredient,
        id: '2'
      }
    ];
    expect(addIngredientState.combination.ingredients).toEqual(ingredients);
    const movedIngredient = {
      ...mockIngredient,
      id: '2'
    };
    const moveUpState = reducer(addIngredientState, moveUp(movedIngredient));
    expect(moveUpState.combination.ingredients[0]).toEqual({
      ...mockIngredient,
      id: '2'
    });
    const moveDownState = reducer(
      addIngredientState,
      moveDown(movedIngredient)
    );
    expect(moveDownState.combination.ingredients[0]).toEqual({
      ...mockIngredient,
      id: '1'
    });
  });
  it('should handle getOrder.pending', () => {
    const state = reducer(
      initialState,
      getOrder.pending('getOrder.pending', [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941'
      ])
    );
    expect(state.orderRequest).toEqual(true);
    expect(state.error).toEqual(null);
  });
  it('should handle getOrder.fulfilled', () => {
    const state = reducer(
      initialState,
      getOrder.fulfilled(
        {
          success: true,
          order: mockOrder,
          name: 'Краторный био-марсианский бургер'
        },
        'getOrder.fulfilled',
        ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941']
      )
    );
    expect(state.orderDataModal).toEqual(mockOrder);
    expect(state.orderRequest).toEqual(false);
    expect(state.error).toEqual(null);
    expect(state.combination.bun).toEqual(null);
    expect(state.combination.ingredients).toEqual([]);
  });
  it('should handle getOrder.rejected', () => {
    const state = reducer(
      initialState,
      getOrder.rejected(new Error('Error'), 'getOrder.rejected', [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941'
      ])
    );
    expect(state.orderRequest).toEqual(false);
    expect(state.error).toEqual('Error');
  });
});
