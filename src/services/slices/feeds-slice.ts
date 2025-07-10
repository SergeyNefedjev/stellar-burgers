import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export type TFeedsState = {
  orders: TOrder[];
  totalToday: number;
  isLoading: boolean;
  total: number;
  error: string;
};
export const initialState: TFeedsState = {
  orders: [],
  totalToday: 0,
  isLoading: false,
  total: 0,
  error: ''
};

export const fetchFeeds = createAsyncThunk(
  'feeds/all',
  async () => await getFeedsApi()
);

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    selectTotalToday: (state) => state.totalToday,
    selectOrders: (state) => state.orders,
    selectTotal: (state) => state.total
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || '';
      });
  }
});

export default feedsSlice.reducer;
export const { selectOrders, selectTotalToday, selectTotal } =
  feedsSlice.selectors;
