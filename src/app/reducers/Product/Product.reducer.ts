import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../../../interface/Product.interface';
import { RootState } from '../../store';

const initialState: IProduct[] = [];

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    AddProduct: (state, action: PayloadAction<IProduct>) => {
      state.push(action.payload);
      return state;
    },
    UpdateProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          name: action.payload.name,
          image: action.payload.image,
          descaption: action.payload.descaption,
          price: action.payload.price,
          size: action.payload.size,
          path: action.payload.path,
          categoriesId: action.payload.categoriesId,
          collectionId: action.payload.collectionId,
        };
        return state;
      }
    },
    PutProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state[index] = {
          ...state[index],
          name: action.payload.name,
          image: action.payload.image,
          descaption: action.payload.descaption,
          price: action.payload.price,
          size: action.payload.size,
          path: action.payload.path,
          categoriesId: action.payload.categoriesId,
          collectionId: action.payload.collectionId,
        };
        return state;
      } else {
        state.push(action.payload);
        return state;
      }
    },
    DeleteProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.findIndex((el) => el.id === action.payload.id);
      if (index > -1) {
        state.splice(index, 1);
        return state;
      }
    },
    SetProduct: (state, action: PayloadAction<IProduct[]>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { AddProduct, UpdateProduct, DeleteProduct, PutProduct, SetProduct } = ProductSlice.actions;

export const GetProduct = (state: RootState) => state.product;
export default ProductSlice.reducer;
