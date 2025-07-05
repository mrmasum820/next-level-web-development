import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { ITask } from "@/types";
import { Trash2 } from "lucide-react";

interface IProps {
  task: ITask;
}

export default function TaskCard({ task }: IProps) {
  return (
    <div className="border px-5 py-3 my-3 rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="size-3 rounded-full bg-green-500"></div>
          <h1>{task.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="link" className="p-0 text-red-500">
            <Trash2 />
          </Button>
          <Checkbox />
        </div>
      </div>
      <p className="mt-5">{task.description}</p>
    </div>
  );
}
