import { AddTaskModal } from "@/components/module/tasks/AddTaskModal";
import TaskCard from "@/components/module/tasks/TaskCard";
import { taskSelectors } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hook";

const Tasks = () => {
  const tasks = useAppSelector(taskSelectors);

  console.log(tasks);

  return (
    <div className="max-w-7xl mx-auto mt-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl mb-5">Tasks</h1>
        <AddTaskModal />
      </div>

      <div>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
