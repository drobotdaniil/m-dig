import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  courseApi,
  CourseQueryParams,
  CourseUpdatePayload,
} from '../../services';
import { FullCourse } from '../../types';

interface CourseState {
  isLoading: boolean;
  isError: boolean;
  course: FullCourse;
}

const initialState: CourseState = {
  course: {
    id: 0,
    name: '',
    topics: [],
  },
  isLoading: false,
  isError: false,
};

export const fetchCourseInfo = createAsyncThunk<FullCourse, CourseQueryParams>(
  'course/fetchCourseInfo',
  async (params): Promise<FullCourse> => {
    try {
      return await courseApi.getCourseInfo(params);
    } catch (error) {
      throw Error('Something went wrong');
    }
  }
);

// This feature will work only in 1 session. 
// It means that it is possible to set notes to course, but after reloading the page they will gone
export const updateCourseInfo = createAsyncThunk<
  FullCourse,
  CourseUpdatePayload
>('course/updateCourseInfo', async (payload): Promise<FullCourse> => {
  const { courseId, notes, topicId, userId } = payload;

  try {
    return await courseApi.setNote({ courseId, userId }, { topicId, notes });
  } catch (error) {
    throw Error('Something went wrong');
  }
});

const courseSlice = createSlice({
  name: 'course',
  reducers: {},
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCourseInfo.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchCourseInfo.fulfilled, (state, action) => {
      state.course = action.payload;
      state.isLoading = false;
    });

    builder.addCase(fetchCourseInfo.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(updateCourseInfo.fulfilled, (state, action) => {
      state.course = action.payload;
    });

    builder.addCase(updateCourseInfo.rejected, (state) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default courseSlice.reducer;
