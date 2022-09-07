import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../../types';

const selectCourseSlice = (state: RootState) => state.course;

export const selectCourse = createSelector(
  selectCourseSlice,
  ({ course }) => course
);

export const selectIsLoading = createSelector(
  selectCourseSlice,
  ({ isLoading }) => isLoading
);

export const selectIsError = createSelector(
  selectCourseSlice,
  ({ isError }) => isError
);
