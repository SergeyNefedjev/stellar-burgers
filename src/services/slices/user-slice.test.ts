import reducer, {
  initialState,
  registerUser,
  loginUser,
  logoutUser,
  getOrders,
  getUser,
  updateUser
} from './user-slice';

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

const registerMockData = {
  email: 'sergeynefedjev',
  name: 'Сергей',
  password: '123'
};

const userMock = {
  email: 'sergeynefedjev',
  name: 'Сергей'
};

const loginMockData = {
  email: 'sergeynefedjev',
  password: '123'
};

describe('profileSlice', () => {
  it('should handle registUser.pending', () => {
    const state = reducer(
      initialState,
      registerUser.pending('registUser.pending', registerMockData)
    );
    expect(state.isLoadingRegistration).toEqual(true);
  });
  it('should handle registUser.fulfilled', () => {
    const state = reducer(
      initialState,
      registerUser.fulfilled(userMock, 'registUser.fulfilled', registerMockData)
    );
    expect(state.isLoadingRegistration).toEqual(false);
    expect(state.user).toEqual(userMock);
  });
  it('should handle registUser.rejected', () => {
    const state = reducer(
      initialState,
      registerUser.rejected(
        new Error('Error'),
        'registUser.rejected',
        registerMockData
      )
    );
    expect(state.isLoadingRegistration).toEqual(false);
    expect(state.error).toEqual('Error');
  });
  it('should handle loginUser.pending', () => {
    const state = reducer(
      initialState,
      loginUser.pending('loginUser.pending', loginMockData)
    );
    expect(state.isLoadingRegistration).toEqual(true);
  });
  it('should handle loginUser.fulfilled', () => {
    const state = reducer(
      initialState,
      loginUser.fulfilled(userMock, 'loginUser.fulfilled', loginMockData)
    );
    expect(state.isLoadingRegistration).toEqual(false);
    expect(state.user).toEqual(userMock);
    expect(state.isAuthChecked).toEqual(true);
  });
  it('should handle loginUser.rejected', () => {
    const state = reducer(
      initialState,
      loginUser.rejected(
        new Error('Error'),
        'loginUser.rejected',
        loginMockData
      )
    );
    expect(state.isLoadingRegistration).toEqual(false);
    expect(state.error).toEqual('Error');
  });
  it('should handle logoutUser.fulfilled', () => {
    const state = reducer(
      initialState,
      logoutUser.fulfilled(undefined, 'logoutUser.fulfilled')
    );
    expect(state.user).toEqual(null);
  });
  it('should handle logoutUser.rejected', () => {
    const state = reducer(
      initialState,
      logoutUser.rejected(new Error('Error'), 'logoutUser.rejected')
    );
    expect(state.error).toEqual('Error');
  });
  it('should handle getUser.pending', () => {
    const state = reducer(initialState, getUser.pending('getUser.pending'));
    expect(state.isAuthChecked).toEqual(false);
  });
  it('should handle getUser.fulfilled', () => {
    const state = reducer(
      initialState,
      getUser.fulfilled({ success: true, user: userMock }, 'getUser.fulfilled')
    );
    expect(state.isAuthChecked).toEqual(true);
    expect(state.user).toEqual(userMock);
  });
  it('should handle getUser.rejected', () => {
    const state = reducer(
      initialState,
      getUser.rejected(new Error('Error'), 'getUser.rejected')
    );
    expect(state.error).toEqual('Error');
    expect(state.isAuthChecked).toEqual(true);
  });
  it('should handle getOrders.pending', () => {
    const state = reducer(initialState, getOrders.pending('getOrders.pending'));
    expect(state.isLoadingOrder).toEqual(true);
  });
  it('should handle getOrders.fulfilled', () => {
    const state = reducer(
      initialState,
      getOrders.fulfilled(mockOrders, 'getOrders.fulfilled')
    );
    expect(state.isLoadingOrder).toEqual(false);
    expect(state.userOrders).toEqual(mockOrders);
  });
  it('should handle getOrders.rejected', () => {
    const state = reducer(
      initialState,
      getOrders.rejected(new Error('Error'), 'getOrders.rejected')
    );
    expect(state.error).toEqual('Error');
  });
  it('should handle updateUser.pending', () => {
    const state = reducer(
      initialState,
      updateUser.pending('updateUser.pending', registerMockData)
    );
    expect(state.isLoadingRegistration).toEqual(true);
  });
  it('should handle updateUser.fulfilled', () => {
    const state = reducer(
      initialState,
      updateUser.fulfilled(
        { success: true, user: userMock },
        'updateUser.fulfilled',
        registerMockData
      )
    );
    expect(state.user).toEqual(userMock);
  });
  it('should handle updateUser.rejected', () => {
    const state = reducer(
      initialState,
      updateUser.rejected(
        new Error('Error'),
        'updateUser.rejected',
        registerMockData
      )
    );
    expect(state.error).toEqual('Error');
    expect(state.isAuthChecked).toEqual(true);
    expect(state.user).toEqual(null);
  });
});
