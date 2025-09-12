import type { Tasks } from '@prisma/client'
import { SquarePenIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { editTask } from '@/actions/edit-task'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Button } from './ui/button'
import { Input } from './ui/input'

interface EditTaskProps {
  task: Tasks
  handleGetTasks: () => void
}

const EditTask = ({ task, handleGetTasks }: EditTaskProps) => {
  const [editedTask, setEditedTask] = useState<string>(task.task)

  const handleEditTask = async () => {
    try {
      if (editedTask !== task.task) {
        toast.success('Tarefa editada com sucesso!')
      } else {
        toast.error('A tarefa deve ser diferente.')
        return
      }

      await editTask({
        id: task.id,
        newTask: editedTask,
      })

      handleGetTasks()
    } catch (error) {
      toast.error('Erro ao editar tarefa: ' + error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <SquarePenIcon className="h-5 w-5 cursor-pointer hover:stroke-zinc-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar tarefa</DialogTitle>
          <DialogDescription className="sr-only">
            Modifique a tarefa abaixo
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2">
          <Input
            placeholder="Editar tarefa"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <DialogClose asChild>
            <Button className="cursor-pointer" onClick={handleEditTask}>
              Editar
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditTask
