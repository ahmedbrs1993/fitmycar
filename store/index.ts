import { configureStore } from "@reduxjs/toolkit";
import vehicleReducer from "./vehicleSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    vehicle: vehicleReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
