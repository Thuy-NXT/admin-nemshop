import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICollection } from '../../../interface/Collection.interface';
import { RootState } from '../../store';

const initialState: ICollection[] = [];

export const CollectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    AddCollection: (state, action: PayloadAction<ICollection>) => {
      state.push(action.payload);
      return state;
    },
    UpdateCollection: (state, action: PayloadAction<ICollection>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          name: action.payload.name,
          path: action.payload.path,
        };
        return state;
      }
    },
    PutCollection: (state, action: PayloadAction<ICollection>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          name: action.payload.name,
          path: action.payload.path,
        };
        return state;
      } else {
        state.push(action.payload);
        return state;
      }
    },
    DeleteCollection: (state, action: PayloadAction<ICollection>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetCollection: (state, action: PayloadAction<ICollection[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { AddCollection, UpdateCollection, DeleteCollection, PutCollection, SetCollection } = CollectionSlice.actions;

export const GetCollection = (state: RootState) => state.collection;
export default CollectionSlice.reducer;
