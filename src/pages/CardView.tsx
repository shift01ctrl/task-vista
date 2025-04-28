
import { useState } from "react";
import { Plus } from "lucide-react";
import { useTaskContext } from "@/context/TaskContext";
import PageLayout from "@/components/layout/PageLayout";
import TaskCard from "@/components/tasks/TaskCard";
import TaskDialog from "@/components/tasks/TaskDialog";
import { Button } from "@/components/ui/button";
import { Task } from "@/types/task";

const CardView = () => {
  const { tasks, deleteTask } = useTaskContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <PageLayout title="Card View">
      <div className="mb-6 flex justify-end">
        <Button onClick={handleAddTask}>
          <Plus className="h-4 w-4 mr-2" /> Add Task
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-medium mb-3 text-gray-700 flex items-center justify-between">
            To Do
            <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {todoTasks.length}
            </span>
          </h3>
          <div className="space-y-3">
            {todoTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={deleteTask}
              />
            ))}
            {todoTasks.length === 0 && (
              <p className="text-center text-sm text-gray-500 py-8">No tasks to do</p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-medium mb-3 text-gray-700 flex items-center justify-between">
            In Progress
            <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {inProgressTasks.length}
            </span>
          </h3>
          <div className="space-y-3">
            {inProgressTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={deleteTask}
              />
            ))}
            {inProgressTasks.length === 0 && (
              <p className="text-center text-sm text-gray-500 py-8">No tasks in progress</p>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border">
          <h3 className="font-medium mb-3 text-gray-700 flex items-center justify-between">
            Done
            <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {doneTasks.length}
            </span>
          </h3>
          <div className="space-y-3">
            {doneTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditTask}
                onDelete={deleteTask}
              />
            ))}
            {doneTasks.length === 0 && (
              <p className="text-center text-sm text-gray-500 py-8">No completed tasks</p>
            )}
          </div>
        </div>
      </div>

      <TaskDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        editingTask={editingTask}
      />
    </PageLayout>
  );
};

export default CardView;
