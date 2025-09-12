'use server'

import { db } from '@/utils/prisma'

export const clearCompletedTasks = async () => {
  try {
    await db.tasks.deleteMany({
      where: {
        done: true,
      },
    })

    const allTasks = await db.tasks.findMany()

    if (!allTasks) return

    return allTasks
  } catch (error) {
    console.log(error)
  }
}
