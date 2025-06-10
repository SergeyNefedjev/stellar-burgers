import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  error: string;
};

export const initialState: TOrderState = {
  order: null,
  orderRequest: false,
  error: ''
};

export const fetchOrder = createAsyncThunk('order/fetch', getOrderByNumberApi);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.orderRequest = false;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.order = null;
        state.orderRequest = false;
        state.error = action.error.message || '';
      });
  }
});

export default orderSlice.reducer;
export const { selectOrder } = orderSlice.selectors;
