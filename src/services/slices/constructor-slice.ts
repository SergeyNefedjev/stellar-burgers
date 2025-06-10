import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { v4 as uuid } from 'uuid';

type TConstructorState = {
  combination: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: string | null;
  orderRequest: boolean;
  orderDataModal: TOrder | null;
};

export const initialState: TConstructorState = {
  combination: {
    bun: null,
    ingredients: []
  },
  error: null,
  orderRequest: false,
  orderDataModal: null
};

export const getOrder = createAsyncThunk(
  'combination/makeOrder',
  async (ingredients: string[]) => {
    const res = await orderBurgerApi(ingredients);
    return res;
  }
);

export const constructorSlice = createSlice({
  name: 'combination',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun')
          state.combination.bun = action.payload;
        else state.combination.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = uuid();
        return {
          payload: {
            ...ingredient,
            id: id
          }
        };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.combination.ingredients = state.combination.ingredients.filter(
        (item) => item.id !== action.payload.id
      );
    },
    closeModal: (state) => {
      state.orderDataModal = null;
      state.orderRequest = false;
      state.combination.bun = null;
      state.combination.ingredients = [];
    },
    moveUp: (state, action: PayloadAction<TConstructorIngredient>) => {
      const index = state.combination.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > 0) {
        state.combination.ingredients[index] =
          state.combination.ingredients[index - 1];
        state.combination.ingredients[index - 1] = action.payload;
      }
    },
    moveDown: (state, action: PayloadAction<TConstructorIngredient>) => {
      const index = state.combination.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index < state.combination.ingredients.length - 1) {
        state.combination.ingredients[index] =
          state.combination.ingredients[index + 1];
        state.combination.ingredients[index + 1] = action.payload;
      }
    }
  },
  selectors: {
    selectCombination: (state) => state.combination,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderDataModal: (state) => state.orderDataModal
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderDataModal = action.payload.order;
        state.combination.bun = null;
        state.combination.ingredients = [];
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error?.message || '';
      });
  }
});

export const { selectCombination, selectOrderRequest, selectOrderDataModal } =
  constructorSlice.selectors;
export const { addIngredient, removeIngredient, moveUp, moveDown, closeModal } =
  constructorSlice.actions;
export default constructorSlice.reducer;
