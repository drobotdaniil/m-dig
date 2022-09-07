import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch as useRootDispatch } from 'react-redux';

import { store } from '..';
import { RootState } from '../../types';

export type AppDispatch = typeof store.dispatch;

export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useDispatch = () => useRootDispatch<TypedDispatch>();
