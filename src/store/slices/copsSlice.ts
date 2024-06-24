import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cop {
  name: string;
  selectedCityId: string;
  selectedVehicleId: string;
}

interface CopsState {
  cops: Cop[];
}

const initialState: CopsState = {
  cops: [
    { name: 'Cop 1', selectedCityId: '', selectedVehicleId: '' },
    { name: 'Cop 2', selectedCityId: '', selectedVehicleId: '' },
    { name: 'Cop 3', selectedCityId: '', selectedVehicleId: '' },
  ],
};

const copsSlice = createSlice({
  name: 'cops',
  initialState,
  reducers: {
    setCopCity(state, action: PayloadAction<{ index: number; cityId: string }>) {
      state.cops[action.payload.index].selectedCityId = action.payload.cityId;
    },
    setCopVehicle(state, action: PayloadAction<{ index: number; vehicleId: string }>) {
      state.cops[action.payload.index].selectedVehicleId = action.payload.vehicleId;
    },
    resetCops(state) {
      state.cops = initialState.cops;
    },
  },
});

export const { setCopCity, setCopVehicle, resetCops } = copsSlice.actions;
export default copsSlice.reducer;
