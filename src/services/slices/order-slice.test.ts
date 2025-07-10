import reducer, { fetchOrder, initialState } from './order-slice';

const mockOrders = [
  {
    _id: '10',
    ingredients: [],
    status: 'done',
    name: 'New Test Order',
    number: 10,
    createdAt: '2025-07-10T10:00:00.000Z',
    updatedAt: '2025-07-10T10:30:00.000Z'
  },
  {
    _id: '20',
    ingredients: [],
    status: 'done',
    name: 'New Test Order',
    number: 20,
    createdAt: '2025-07-10T10:00:00.000Z',
    updatedAt: '2025-07-10T10:30:00.000Z'
  }
];

describe('order-slice', () => {
  it('should handle fetchOrder.pending', () => {
    const state = reducer(
      initialState,
      fetchOrder.pending('fetchOrder.pending', 0)
    );
    expect(state.orderRequest).toEqual(true);
  });
  it('should handle fetchOrder.fulfilled', () => {
    const state = reducer(
      initialState,
      fetchOrder.fulfilled(
        {
          success: true,
          orders: mockOrders
        },
        'fetchOrder.fulfilled',
        0
      )
    );
    expect(state.orderRequest).toEqual(false);
    expect(state.order).toEqual(mockOrders[0]);
  });
  it('should handle fetchOrder.rejected', () => {
    const state = reducer(
      initialState,
      fetchOrder.rejected(
        new Error('Error fetching order'),
        'fetchOrder.rejected',
        0
      )
    );
    expect(state.orderRequest).toEqual(false);
    expect(state.order).toEqual(null);
    expect(state.error).toEqual('Error fetching order');
  });
});
