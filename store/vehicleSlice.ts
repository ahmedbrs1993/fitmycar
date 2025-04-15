import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type VehicleState = {
  brand: string | null;
  model: string | null;
};

const initialState: VehicleState = {
  brand: null,
  model: null,
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
      }>
    ) => {
      state.brand = action.payload.brand;
      state.model = action.payload.model;
    },
    clearVehicleConfig: (state) => {
      state.brand = null;
      state.model = null;
    },
  },
});

export const { setVehicleConfig, clearVehicleConfig } = vehicleSlice.actions;

export default vehicleSlice.reducer;
