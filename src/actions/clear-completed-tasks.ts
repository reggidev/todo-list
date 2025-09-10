'use server'

import { prisma } from '@/utils/prisma'

export const clearCompletedTasks = async () => {
  try {
    await prisma.tasks.deleteMany({
      where: {
        done: true,
      },
    })

    const allTasks = await prisma.tasks.findMany()

    if (!allTasks) return

    return allTasks
  } catch (error) {
    console.log(error)
  }
}
