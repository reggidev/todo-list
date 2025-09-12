import type { Tasks } from '@prisma/client'
import { AlertCircleIcon, TrashIcon } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

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
          <p className="flex items-center justify-center gap-1 border-t-1 py-4 text-sm">
            <AlertCircleIcon className="h-5 w-5" />
            Você não possui tarefas cadastradas.
          </p>
        )}

        {filteredTasks
          .sort((a, b) => {
            if (a.done !== b.done) {
              return Number(a.done) - Number(b.done) // pendentes antes das concluídas
            }
            return a.task.localeCompare(b.task) // dentro do grupo, ordem alfabética
          })
          .map((task) => (
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

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <TrashIcon className="h-5 w-5 cursor-pointer hover:stroke-zinc-500" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Tem certeza que deseja excluir esta tarefa?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction
                        className="cursor-pointer bg-red-500 hover:bg-red-600"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Excluir
                      </AlertDialogAction>
                      <AlertDialogCancel className="cursor-pointer">
                        Cancelar
                      </AlertDialogCancel>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
      </div>
    </ScrollArea>
  )
}

export default TasksList
