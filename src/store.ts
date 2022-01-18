import { TypedUseSelectorHook, useSelector as useReduxSelector } from 'react-redux';
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { State } from './types';

const initialState: State = {
  transactions: {},
  tasks: [],
  user: null
};

export const { actions, reducer } = createSlice({
  name: 'store',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Partial<State>>) => ({ ...state, ...action.payload }),
    // TODO: Write this reducer
    addTransactions: (state, action: PayloadAction<Partial<State>>) => ({
      ...state,
      transactions: { ...state.transactions, ...action.payload.transactions }
    }),
    updateTransaction: (state, action: PayloadAction<Partial<{id: string, deleted: boolean}>>) => {
      let _transactions = { ...state.transactions }
      
      if (action.payload.id && action.payload.deleted)
        _transactions[action.payload.id] = { ..._transactions[action.payload.id], deleted: action.payload.deleted }
      
        return {
          ...state,
          transactions: { ..._transactions }
        }
    }
  }
});

const store = configureStore({
  reducer,
  devTools: true
});

export default store;

export { useDispatch } from 'react-redux';

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;
