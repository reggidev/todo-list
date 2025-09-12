'use server'

import { db } from '@/utils/prisma'

export const NewTask = async (task: string) => {
  try {
    if (!task) return

    const newTask = await db.tasks.create({
      data: {
        task,
        done: false,
      },
    })

    if (!newTask) return

    return newTask
  } catch (error) {
    console.log('Error adding new task:', error)
  }
}
