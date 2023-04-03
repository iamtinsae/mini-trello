import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from './store';
import { ListType, CardType } from './types';

type ListsState = {
  status: 'loading' | 'succeeded' | 'failed';
  lists: ListType[];
};

const initialState: ListsState = {
  lists: [],
  status: 'loading',
};

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setLists: (state, action: PayloadAction<ListType[]>) => {
      state.lists = action.payload;
      state.status = 'succeeded';
    },
    updateList: (state, action: PayloadAction<ListType>) => {
      state.lists = state.lists.map((list) => {
        if (list.id === action.payload.id) {
          return action.payload;
        }
        return list;
      });
    },
    addList: (state, action: PayloadAction<ListType>) => {
      state.lists.push(action.payload);
    },
    removeList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload);
    },
    addCard: (
      state,
      action: PayloadAction<{ listId: string; card: CardType }>
    ) => {
      state.lists.map((list) => {
        if (list.id === action.payload.listId) {
          list.cards.push(action.payload.card);
        }
        return list;
      });
    },
    removeCard: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.map((list) => {
        list.cards = list.cards.filter((card) => card.id !== action.payload);
        return list;
      });
    },
    updateCard: (
      state,
      action: PayloadAction<{ cardId: string; card: CardType }>
    ) => {
      state.lists = state.lists.map((list) => {
        list.cards = list.cards.map((card) => {
          if (card.id === action.payload.cardId) {
            return action.payload.card;
          }
          return card;
        });
        return list;
      });
    },
  },
});

export const {
  setLists,
  updateList,
  addList,
  removeList,
  addCard,
  removeCard,
  updateCard,
} = listsSlice.actions;

export const selectLists = (state: RootState) => state.listsReducer.lists;
export const selectStatus = (state: RootState) => state.listsReducer.status;

export default listsSlice.reducer;
