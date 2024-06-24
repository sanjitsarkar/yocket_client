import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../utils/axios';

export interface ICity {
  _id: number;
  name: string;
  distance: number;
}

interface CityState {
  cities: ICity[];
  loading: boolean;
  error: string | null;
}

export const fetchCities = createAsyncThunk<ICity[]>('city/fetchCities', async () => {
  try {
    const response = await api.get('/cities');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cities');
  }
});

const initialState: CityState = {
  cities: [],
  loading: false,
  error: null
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    resetCities(state) {
      state.cities = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action: PayloadAction<ICity[]>) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  resetCities
} = citySlice.actions;
export default citySlice.reducer;
