import { describe } from 'node:test';
import reducer, { fetchFeeds, initialState } from './feeds-slice';

const mockFeeds = {
  orders: [
    {
      _id: '10',
      ingredients: ['ingredient1', 'ingredient2'],
      status: 'pending',
      name: 'New Test Order',
      number: 10,
      createdAt: '2025-07-10T10:00:00.000Z',
      updatedAt: '2025-07-10T10:05:00.000Z'
    },
    {
      _id: '20',
      ingredients: ['ingredient3', 'ingredient4'],
      status: 'done',
      name: 'New Test Order',
      number: 20,
      createdAt: '2025-07-10T10:00:00.000Z',
      updatedAt: '2025-07-10T10:05:00.000Z'
    }
  ],
  total: 1,
  totalToday: 1
};

describe('feeds-slice', () => {
  it('should handle fetchFeeds.pending', () => {
    const state = reducer(
      initialState,
      fetchFeeds.pending('fetchFeeds.pending')
    );
    expect(state.isLoading).toEqual(true);
  });
  it('should handle fetchFeeds.fulfilled', async () => {
    const state = reducer(
      initialState,
      fetchFeeds.fulfilled(
        {
          success: true,
          orders: mockFeeds.orders,
          total: mockFeeds.total,
          totalToday: mockFeeds.totalToday
        },
        'fetchFeeds.fulfilled'
      )
    );
    expect(state.isLoading).toEqual(false);
    expect(state.orders).toEqual(mockFeeds.orders);
    expect(state.total).toEqual(mockFeeds.total);
    expect(state.totalToday).toEqual(mockFeeds.totalToday);
  });
  it('should handle fetchFeeds.rejected', async () => {
    const state = reducer(
      initialState,
      fetchFeeds.rejected(
        new Error('Error fetching feeds'),
        'fetchFeeds.rejected'
      )
    );
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual('Error fetching feeds');
  });
});
