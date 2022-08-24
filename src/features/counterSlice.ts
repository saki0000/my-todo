import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

export interface CounterState {
  id: number;
}

const initialState: CounterState = {
  id: 0,
};

export const separateSlice = createSlice({
  name: "separate",
  initialState,
  reducers: {
    separate: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

export const { separate } = separateSlice.actions;
export const selectSeparate = (state: RootState) => state.separate;

export default separateSlice.reducer;
