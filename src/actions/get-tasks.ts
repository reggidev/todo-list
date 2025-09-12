'use server'

import { db } from '@/utils/prisma'

export const getTasks = async () => {
  const tasks = await db.tasks.findMany()

  if (!tasks) return

  return tasks
}
