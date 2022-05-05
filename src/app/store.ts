import WarehousesFilterReducer from './../slices/WarehousesFilterSlice';
import WarehousesListReducer from '../slices/WarehousesListSlice'

import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = {
  warehousesList: WarehousesListReducer,
  warehousesFilter: WarehousesFilterReducer,
}

export const store = configureStore({
  reducer: rootReducer,
})
 devTools: process.env.NODE_ENV !== 'production'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

