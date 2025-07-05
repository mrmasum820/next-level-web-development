import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface InitialState {
  task: ITask[];
  filter: "all" | "completed" | "uncompleted";
}

const initialState: InitialState = {
  task: [],
  filter: "all",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      const id = uuidv4();
      const taskData = {
        ...action.payload,
        id,
        isCompleted: false,
      };
      state.task.push(taskData);
    },
  },
});

export const taskSelectors = (state: RootState) => state.tasks.task;

export const filterSelectors = (state: RootState) => state.tasks.filter;

export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
