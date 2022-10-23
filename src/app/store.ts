import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import separateReducer from "../redux/counterSlice";
import userReducer from "../redux/userSlice";

export const store = configureStore({
  reducer: {
    separate: separateReducer,
    user: userReducer,
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
