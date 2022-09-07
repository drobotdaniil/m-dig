import { createSelector } from '@reduxjs/toolkit';
import { Course, RootState, User } from '../../types';

const selectUserSlice = (state: RootState) => state.user;

const selectUser = createSelector(selectUserSlice, ({ user }) => user);

export const selectUserId = createSelector(
  selectUser,
  (user: User | null): number => user?.id || 0
);

export const selectUserFirstName = createSelector(
  selectUser,
  (user: User | null): string => user?.firstName || ''
);

export const selectUserAvatar = createSelector(
  selectUser,
  (user: User | null): string => user?.avatar || ''
);

export const selectUserCourses = createSelector(
  selectUser,
  (user: User | null): Course[] => user?.courses || []
);

export const selectUserToken = createSelector(
  selectUserSlice,
  ({ userToken }) => userToken
);

export const selectIsLoading = createSelector(
  selectUserSlice,
  ({ isLoading }) => isLoading
);

export const selectIsError = createSelector(
  selectUserSlice,
  ({ isError }) => isError
);
