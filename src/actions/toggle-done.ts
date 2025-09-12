'use server'

import { db } from '@/utils/prisma'

export const updateTaskStatus = async (id: string) => {
  try {
    const currentTask = await db.tasks.findUnique({
      where: { id },
    })

    if (!currentTask) return

    const updatedStatus = await db.tasks.update({
      where: { id },
      data: { done: !currentTask.done },
    })

    if (!updatedStatus) return

    return updatedStatus
  } catch (error) {
    console.error('Error updating task status:', error)
  }
}
