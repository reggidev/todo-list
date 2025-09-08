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

import { getTasks } from '@/actions/get-tasks'
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

  const handleGetTasks = async () => {
    const tasks = await getTasks()

    if (!tasks) return

    setTaskList(tasks)
  }

  useEffect(() => {
    handleGetTasks()
  }, [])

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Card className="w-lg">
        {/* Header */}
        <CardHeader className="flex gap-2">
          <Input placeholder="Adicionar tarefa" />
          <Button className="cursor-pointer">
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
                <div className="h-full w-1 bg-green-300" />
                <p className="flex-1 px-2 text-sm">{task.task}</p>
                <div className="flex items-center gap-2">
                  <EditTasks />
                  <TrashIcon className="h-5 w-5 cursor-pointer hover:stroke-zinc-500" />
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
