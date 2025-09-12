'use server'

import { db } from '@/utils/prisma'

interface EditTaskProps {
  id: string
  newTask: string
}

export const editTask = async ({ id, newTask }: EditTaskProps) => {
  try {
    if (!id || !newTask) return null

    const editedTask = await db.tasks.update({
      where: {
        id,
      },
      data: {
        task: newTask,
      },
    })

    if (!editedTask) return
  } catch (error) {
    console.log(error)
  }
}
