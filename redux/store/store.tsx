import { configureStore } from "@reduxjs/toolkit";
import { mutationApi } from "../api/mutationApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from "redux";
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

import detailsReducer from "../slice/details";
const reducers = combineReducers({
  [mutationApi.reducerPath]: mutationApi.reducer,
  details: detailsReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["details"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          // Redux-persist actions
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          // All RTK Query mutation lifecycle actions
          "api/executeQuery/fulfilled", // This is for queries
          "api/executeMutation/fulfilled", // This is what you had
          "__rtkq/mutationStarted",
          "__rtkq/mutationFulfilled",
          "__rtkq/mutationRejected",
          "api/executeMutation/fulfilled",
          "__rtkq/focused",
          "__rtkq/unfocused",
        ],
      },
    }).concat(mutationApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
setupListeners(store.dispatch);

export default store;
