'use client'

import { Loader2Icon, PlusIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { NewTask } from '@/actions/add-tasks'
import { clearCompletedTasks } from '@/actions/clear-completed-tasks'
import { deleteTask } from '@/actions/delete-task'
import { getTasks } from '@/actions/get-tasks'
import { updateTaskStatus } from '@/actions/toggle-done'
import FilterTask, { FilterType } from '@/components/filter-task'
import TaskStats from '@/components/task-stats'
import TasksList from '@/components/tasks-list'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tasks } from '@/generated/prisma'

const Home = () => {
  const [taskList, setTaskList] = useState<Tasks[]>([])
  const [task, setTask] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all')
  const [filteredTasks, setFilteredTasks] = useState<Tasks[]>([])

  const handleGetTasks = async () => {
    const tasks = await getTasks()
    if (!tasks) return
    setTaskList(tasks)
  }

  const handleAddTask = async () => {
    setLoading(true)
    try {
      if (!task.trim()) {
        toast.error('Insira uma tarefa.')
        setLoading(false)
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
    setLoading(false)
  }

  const handleDeleteTask = async (id: string) => {
    try {
      if (!id) return
      const deletedTask = await deleteTask(id)

      if (!deletedTask) return

      await handleGetTasks()
      toast.success('Tarefa deletada com sucesso!')
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
      })

      await updateTaskStatus(id)
    } catch (error) {
      setTaskList(previousTasks)
      toast.error('Erro ao atualizar tarefa, tente novamente.' + error)
    }
  }

  const deleteCompletedTasks = async () => {
    const deletedTasks = await clearCompletedTasks()

    if (!deletedTasks) return

    toast.success('Tarefas concluídas deletadas com sucesso!')
    setTaskList(deletedTasks)
  }

  const tasksDone = taskList.filter((task) => task.done).length

  useEffect(() => {
    handleGetTasks()
  }, [])

  useEffect(() => {
    if (currentFilter === 'all') {
      setFilteredTasks(taskList)
    } else {
      setFilteredTasks(
        taskList.filter((task) =>
          currentFilter === 'pending' ? !task.done : task.done,
        ),
      )
    }
  }, [currentFilter, taskList])

  return (
    <main className="flex h-screen w-full items-center justify-center bg-gray-100">
      <Card className="w-lg">
        <CardHeader className="flex gap-2">
          <Input
            placeholder="Adicionar tarefa"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />
          <Button
            disabled={loading}
            className="cursor-pointer gap-1"
            onClick={handleAddTask}
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <PlusIcon />
                Adicionar
              </>
            )}
          </Button>
        </CardHeader>

        <CardContent>
          <Separator className="mb-4" />

          <FilterTask
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
          />

          <TasksList
            filteredTasks={filteredTasks}
            taskListLength={taskList.length}
            handleToggleTask={handleToggleTask}
            handleDeleteTask={handleDeleteTask}
            handleGetTasks={handleGetTasks}
          />
        </CardContent>

        <CardFooter className="flex-col">
          <TaskStats
            taskList={taskList}
            tasksDone={tasksDone}
            deleteCompletedTasks={deleteCompletedTasks}
          />
        </CardFooter>
      </Card>
    </main>
  )
}

export default Home
