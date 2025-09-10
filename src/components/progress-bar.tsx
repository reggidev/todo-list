import { Tasks } from '@/generated/prisma'

interface ProgressBarProps {
  taskList: Tasks[]
  tasksDone: number
}

const ProgressBar = ({ taskList, tasksDone }: ProgressBarProps) => {
  return (
    <div className="mt-4 h-2 w-full rounded-md bg-gray-200">
      <div
        className="h-full rounded-md bg-blue-500"
        style={{ width: `${(tasksDone / taskList.length) * 100}%` }}
      />
    </div>
  )
}

export default ProgressBar
