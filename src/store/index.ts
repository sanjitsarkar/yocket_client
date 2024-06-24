import { configureStore } from '@reduxjs/toolkit';
import copsReducer from './slices/copsSlice';
import citiesReducer from './slices/citiesSlice';
import vehiclesReducer from './slices/vehiclesSlice';
import resultReducer from './slices/resultSlice';

const store = configureStore({
  reducer: {
    cops: copsReducer,
    cities: citiesReducer,
    vehicles: vehiclesReducer,
    result: resultReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
