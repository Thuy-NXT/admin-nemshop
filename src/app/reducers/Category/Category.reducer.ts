import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory } from '../../../interface/Category.interface';
import { RootState } from '../../store';

const initialState: ICategory[] = [];

export const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    AddCategory: (state, action: PayloadAction<ICategory>) => {
      state.push(action.payload);
      return state;
    },
    UpdateCategory: (state, action: PayloadAction<ICategory>) => {
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
    PutCategory: (state, action: PayloadAction<ICategory>) => {
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
    DeleteCategory: (state, action: PayloadAction<ICategory>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetCategory: (state, action: PayloadAction<ICategory[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { AddCategory, UpdateCategory, DeleteCategory, PutCategory, SetCategory } = CategorySlice.actions;

export const GetCategory = (state: RootState) => state.category;
export default CategorySlice.reducer;
