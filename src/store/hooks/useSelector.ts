import {
  TypedUseSelectorHook,
  useSelector as useRootSelector,
} from 'react-redux';

import { RootState } from '../../types';

export const useSelector: TypedUseSelectorHook<RootState> = useRootSelector;
