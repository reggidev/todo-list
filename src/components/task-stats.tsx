import type { Tasks } from '@prisma/client'
import { ListCheckIcon, SigmaIcon } from 'lucide-react'

import ClearCompletedTaskDialog from './clear-completed-task-dialog'
import ProgressBar from './progress-bar'

interface TaskStatsProps {
  taskList: Tasks[]
  tasksDone: number
  deleteCompletedTasks: () => Promise<void>
}

const TaskStats = ({
  taskList,
  tasksDone,
  deleteCompletedTasks,
}: TaskStatsProps) => {
  return (
    <>
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-1">
          <ListCheckIcon className="h-4 w-4" />
          <p className="text-xs">
            Tarefas concluídas ({tasksDone}/{taskList.length})
          </p>
        </div>

        <ClearCompletedTaskDialog deleteCompletedTasks={deleteCompletedTasks} />
      </div>
      <ProgressBar taskList={taskList} tasksDone={tasksDone} />

      {/* Tasks Total */}
      <div className="mt-2 flex w-full items-center justify-end gap-1">
        <SigmaIcon className="h-4 w-4" />
        <p className="text-sm">{taskList.length} tarefas no total</p>
      </div>
    </>
  )
}

export default TaskStats
