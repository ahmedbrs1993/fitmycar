import { configureStore, combineReducers } from "@reduxjs/toolkit";
import vehicleReducer from "./vehicleSlice";
import productReducer from "./productSlice";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
  vehicle: vehicleReducer,
  product: productReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["vehicle", "product"], // les slices à persister
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // sinon redux-persist crashe
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
