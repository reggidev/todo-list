import { TrashIcon } from 'lucide-react'

import { Tasks } from '@/generated/prisma'

import EditTask from './edit-task'
import { ScrollArea } from './ui/scroll-area'

interface TaskListProps {
  filteredTasks: Tasks[]
  taskListLength: number
  handleToggleTask: (id: string) => void
  handleDeleteTask: (id: string) => void
  handleGetTasks: () => Promise<void>
}

const TasksList = ({
  filteredTasks,
  taskListLength,
  handleToggleTask,
  handleDeleteTask,
  handleGetTasks,
}: TaskListProps) => {
  return (
    <ScrollArea className="mt-4 h-[300px] border-b-1">
      <div className="">
        {taskListLength === 0 && (
          <p className="border-t-1 py-2 text-sm">
            Você não possui tarefas cadastradas.
          </p>
        )}

        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="flex h-14 items-center justify-between border-t-1"
          >
            <div
              className={`h-full w-1 ${task.done ? 'bg-green-300' : 'bg-red-400'}`}
            />
            <p
              className="flex-1 cursor-pointer px-2 text-sm hover:text-gray-700"
              onClick={() => handleToggleTask(task.id)}
            >
              {task.task}
            </p>
            <div className="flex items-center gap-2 pr-4">
              <EditTask task={task} handleGetTasks={handleGetTasks} />
              <TrashIcon
                className="h-5 w-5 cursor-pointer hover:stroke-zinc-500"
                onClick={() => handleDeleteTask(task.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default TasksList
