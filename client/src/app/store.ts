import propertyCreationReducer from './../slices/PropertyCreationSlice';
import PropertiesFilterReducer from './../slices/PropertiesFilterSlice';
import PropertiesListReducer from '../slices/PropertiesListSlice'
import PropertyDetailsReducer from '../slices/PropertyDetailsSlice'
import UserRegisterReducer from '../slices/UserRegisterSlice'
import UserLoginReducer, { authMiddleware } from '../slices/UserLoginSlice'
import UserLogoutReducer from '../slices/UserLogoutSlice'


import { configureStore } from '@reduxjs/toolkit'

export const rootReducer = {
  propertiesList: PropertiesListReducer,
  propertiesFilter: PropertiesFilterReducer,
  postProperty: propertyCreationReducer, // propertyCreation
  propertyDetails: PropertyDetailsReducer,
  userRegister: UserRegisterReducer,
  userLogin: UserLoginReducer,
  userLogout: UserLogoutReducer,
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware)
})
//  devTools: process.env.NODE_ENV !== 'production',
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

