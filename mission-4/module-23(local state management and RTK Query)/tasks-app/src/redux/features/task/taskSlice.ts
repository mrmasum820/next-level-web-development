import type { RootState } from "@/redux/store";
import type { ITask } from "@/types";
import { createSlice, type PayloadAction, nanoid } from "@reduxjs/toolkit";

interface InitialState {
  task: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

const initialState: InitialState = {
  task: [
    {
      id: "1",
      title: "Task 1",
      description: "Task 1 description",
      dueDate: "2023-01-01",
      priority: "low",
      isCompleted: false,
    },
  ],
  filter: "all",
};

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;

const createTask = (taskData: DraftTask): ITask => {
  return { id: nanoid(), isCompleted: false, ...taskData };
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<DraftTask>) => {
      const taskData = createTask(action.payload);
      state.task.push(taskData);
    },
    toggleCompleteState: (state, action: PayloadAction<string>) => {
      state.task.forEach((task) =>
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.task = state.task.filter((task) => task.id !== action.payload);
    },
    updateFilter: (
      state,
      action: PayloadAction<"all" | "high" | "medium" | "low">
    ) => {
      state.filter = action.payload;
    },
  },
});

export const taskSelectors = (state: RootState) => {
  const filter = state.tasks.filter;

  if (filter === "low") {
    return state.tasks.task.filter((task) => task.priority === "low");
  } else if (filter === "medium") {
    return state.tasks.task.filter((task) => task.priority === "medium");
  } else if (filter === "high") {
    return state.tasks.task.filter((task) => task.priority === "high");
  } else {
    return state.tasks.task;
  }
};

export const filterSelectors = (state: RootState) => state.tasks.filter;

export const { addTask, toggleCompleteState, deleteTask, updateFilter } =
  taskSlice.actions;

export default taskSlice.reducer;
