import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  counter: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  counter: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.counter += action.payload;
    },
    decrement: (state, action) => {
      state.counter -= action.payload;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
