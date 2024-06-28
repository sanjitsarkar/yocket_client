import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../utils/axios';
import { ICity } from './citiesSlice';

export interface IResult {
  capturingCop: {
    name: string;
    selectedCity: string;
    selectedVehicle: string;
  },
  fugitiveCity: ICity
}
interface ResultState {
  result: IResult | null;
  loading: boolean;
  error: string | null;
}

export interface ICop {
  name: string;
  selectedCityId: string;
  selectedVehicleId: string;
}

interface FetchResultPayload {
  cops: ICop[];
}

export const fetchResult = createAsyncThunk('result/fetchResult', async (payload: FetchResultPayload) => {
  try {
    const response = await api.post("/result", { cops: payload.cops });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch result');
  }
});

const initialState: ResultState = {
  result: null,
  loading: false,
  error: null
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    resetResult(state) {
      state.result = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResult.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(fetchResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }

});

export const { resetResult } = resultSlice.actions;
export default resultSlice.reducer;



