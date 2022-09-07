import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userApi, UserResponse } from '../../services';
import { RootState, User } from '../../types';

interface UserState {
  user: User | null;
  userToken: string | null;
  isLoading: boolean;
  isError: boolean;
}

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null;

const initialState: UserState = {
  user: null,
  userToken,
  isError: false,
  isLoading: false,
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (): Promise<UserResponse> => {
    try {
      return await userApi.login();
    } catch {
      throw Error('Something went wrong');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_payload, { dispatch, getState }) => {
    const {
      user: { userToken },
    } = getState() as RootState;

    try {
      dispatch(logOutAction());
      await userApi.logOut(userToken || '');
    } catch {
      throw Error('Something went wrong');
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/profile',
  async (): Promise<User> => {
    try {
      return await userApi.getUserData();
    } catch {
      throw Error('Something went wrong');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.userToken = null;
    },
  },
  initialState,
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.userToken = action.payload.token;
      state.user = action.payload.user;
      state.isLoading = false;
    });

    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchUser.rejected, (state) => {
      state.isError = false;
      state.isLoading = false;
    });
  },
});

const { logOut: logOutAction } = userSlice.actions;

export default userSlice.reducer;
