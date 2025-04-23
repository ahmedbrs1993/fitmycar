import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type VehicleState = {
  brand: string | null;
  model: string | null;
  generation: string | null;
  fuelType: string | null;
};

const initialState: VehicleState = {
  brand: null,
  model: null,
  generation: null,
  fuelType: null,
};

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setVehicleConfig: (
      state,
      action: PayloadAction<{
        brand: string;
        model: string;
        generation: string;
        fuelType: string;
      }>
    ) => {
      state.brand = action.payload.brand;
      state.model = action.payload.model;
      state.generation = action.payload.generation;
      state.fuelType = action.payload.fuelType;
    },
    clearVehicleConfig: (state) => {
      state.brand = null;
      state.model = null;
      state.generation = null;
      state.fuelType = null;
    },
  },
});

export const { setVehicleConfig, clearVehicleConfig } = vehicleSlice.actions;

export default vehicleSlice.reducer;
