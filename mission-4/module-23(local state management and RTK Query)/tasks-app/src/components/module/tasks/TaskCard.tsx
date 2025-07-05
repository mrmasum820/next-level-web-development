import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  deleteTask,
  toggleCompleteState,
} from "@/redux/features/task/taskSlice";
import { useAppDispatch } from "@/redux/hook";
import type { ITask } from "@/types";
import { Trash2 } from "lucide-react";

interface IProps {
  task: ITask;
}

export default function TaskCard({ task }: IProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="border px-5 py-3 my-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div
            className={cn("size-3 rounded-full bg-green-500", {
              "bg-green-500": task.priority === "low",
              "bg-yellow-500": task.priority === "medium",
              "bg-red-500": task.priority === "high",
            })}
          ></div>
          <h1
            className={cn("text-xl font-semibold uppercase", {
              "line-through": task.isCompleted,
            })}
          >
            {task.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => dispatch(deleteTask(task.id))}
            variant="link"
            className="p-0 text-red-500"
          >
            <Trash2 />
          </Button>
          <Checkbox
            checked={task.isCompleted}
            onClick={() => dispatch(toggleCompleteState(task.id))}
          />
        </div>
      </div>
      <p className="mt-5">{task.description}</p>
    </div>
  );
}
