import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import separateReducer from "../features/counterSlice";

export const store = configureStore({
  reducer: {
    separate: separateReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
