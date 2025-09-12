'use server'

import { db } from '@/utils/prisma'

export const deleteTask = async (id: string) => {
  try {
    if (!id) return

    const deletedTask = await db.tasks.delete({
      where: {
        id,
      },
    })

    if (!deletedTask) return

    return deletedTask
  } catch (error) {
    console.log('Error deleting task:', error)
  }
}
