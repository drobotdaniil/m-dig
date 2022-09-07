import { combineReducers } from '@reduxjs/toolkit';
import courseReducer from './course.reducer';

import userReducer from './user.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  course: courseReducer,
});
