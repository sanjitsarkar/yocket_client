import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/axios';

export interface IVehicle {
  _id: number;
  kind: string;
  range: number;
  count: number;

}

interface VehiclesState {
  vehicles: IVehicle[];
  loading: boolean;
  error: string | null;
}

export const fetchVehicles = createAsyncThunk('vehicle/fetchVehicles', async () => {
  try {
    const response = await api.get('/vehicles');
    return response.data as IVehicle[]; // Type assertion to Vehicle[]
  } catch (error) {
    throw new Error('Failed to fetch vehicles');
  }
});

const initialState: VehiclesState = {
  vehicles: [],
  loading: false,
  error: null
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    resetVehicles(state) {
      state.vehicles = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action: PayloadAction<IVehicle[]>) => {
        state.loading = false;
        state.vehicles = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { resetVehicles } = vehicleSlice.actions;
export default vehicleSlice.reducer;
