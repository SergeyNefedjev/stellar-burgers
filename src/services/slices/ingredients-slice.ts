import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export interface IIngredientsState {
  ingredients: TIngredient[];
  isLoading: boolean;
  hasError: boolean;
  error: string;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  isLoading: false,
  hasError: false,
  error: ''
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetch',
  getIngredientsApi
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (state) => state.isLoading,
    selectIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.hasError = true;
        state.error = action.error?.message || '';
      });
  }
});

export const { selectIngredients, selectIsLoading } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
