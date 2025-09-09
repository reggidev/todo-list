'use client'

import {
  CheckIcon,
  CircleEllipsisIcon,
  ListCheckIcon,
  ListIcon,
  PlusIcon,
  SigmaIcon,
  TrashIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { NewTask } from '@/actions/add-tasks'
import { deleteTask } from '@/actions/delete-task'
import { getTasks } from '@/actions/get-tasks'
import { updateTaskStatus } from '@/actions/toggle-done'
import EditTasks from '@/components/edit-task'
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
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tasks } from '@/generated/prisma'

const Home = () => {
  const [taskList, setTaskList] = useState<Tasks[]>([])
  const [task, setTask] = useState<string>('')

  const handleGetTasks = async () => {
    const tasks = await getTasks()
    if (!tasks) return
    setTaskList(tasks)
  }

  const handleAddTask = async () => {
    try {
      if (task.length === 0 || !task) {
        toast.warning('Digite uma tarefa válida.')
        return
      }

      const myNewTask = await NewTask(task)

      if (!myNewTask) return

      setTask('')

      toast.success('Tarefa adicionada com sucesso!')

      await handleGetTasks()
    } catch (error) {
      toast.error('Erro ao adicionar tarefa, tente novamente.' + error)
    }
  }

  const handleDeleteTask = async (id: string) => {
    try {
      if (!id) return
      const deletedTask = await deleteTask(id)

      if (!deletedTask) return

      await handleGetTasks()
      toast.warning('Tarefa deletada com sucesso!')
    } catch (error) {
      toast.error('Erro ao deletar tarefa, tente novamente.' + error)
    }
  }

  const handleToggleTask = async (id: string) => {
    const previousTasks = [...taskList]

    try {
      setTaskList((prev) => {
        const updatedTaskList = prev.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              done: !task.done,
            }
          } else {
            return task
          }
        })
        return updatedTaskList
        /* setTaskList(updatedTaskList) */
      })

      await updateTaskStatus(id)
    } catch (error) {
      setTaskList(previousTasks)
      toast.error('Erro ao atualizar tarefa, tente novamente.' + error)
    }
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Card className="w-lg">
        {/* Header */}
        <CardHeader className="flex gap-2">
          <Input
            placeholder="Adicionar tarefa"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Button className="cursor-pointer" onClick={handleAddTask}>
            <PlusIcon />
            Cadastrar
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          {/* Filtros */}
          <div className="flex gap-1">
            <Badge className="cursor-pointer" variant="default">
              <ListIcon />
              Todas
            </Badge>

            <Badge className="cursor-pointer" variant="outline">
              <CircleEllipsisIcon />
              Não finalizadas
            </Badge>

            <Badge className="cursor-pointer" variant="outline">
              <CheckIcon />
              Concluidas
            </Badge>
          </div>

          {/* Tarefas */}
          <div className="mt-4 border-b-1">
            {taskList.map((task) => (
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
                <div className="flex items-center gap-2">
                  <EditTasks />
                  <TrashIcon
                    className="h-5 w-5 cursor-pointer hover:stroke-zinc-500"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <div className="flex items-center gap-1">
              <ListCheckIcon className="h-4 w-4" />
              <p className="text-xs">Tarefas concluídas (3/3)</p>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="outline" className="cursor-pointer">
                  <TrashIcon />
                  Limpar tarefas concluídas
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir x itens?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta ação não pode ser desfeita.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogAction className="cursor-pointer bg-red-500 hover:bg-red-600">
                    Excluir
                  </AlertDialogAction>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancelar
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="mt-4 h-2 w-full rounded-md bg-gray-200">
            <div
              className="h-full rounded-md bg-blue-500"
              style={{ width: '50%' }}
            />
          </div>

          <div className="mt-2 flex items-center justify-end gap-1">
            <SigmaIcon className="h-4 w-4" />
            <p className="text-sm">3 tarefas no total</p>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Home
