import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import LoadingReducer from './reducers/Loading/Loading.reducer';

import CategoryReducer from './reducers/Category/Category.reducer';
import CollectionReducer from './reducers/Collection/Collection.reducer';
import ProductReducer from './reducers/Product/Product.reducer';
export const store = configureStore({
  reducer: {
    loading: LoadingReducer,
    category: CategoryReducer,
    collection: CollectionReducer,
    product: ProductReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
