import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { method } = req

  if (method === 'GET') {

    const users = await prisma.user.findMany()

    return res.status(200).json({
      data: users,
    })
  } else if (method === 'POST') {

    const { name } = req.body

    const user = await prisma.user.create({
      data: {
        name,
      }
    })

    return res.status(201).json({
      data: user,
    })
  } else if (method === 'PUT') {

    const { id, name } = req.body

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
      }
    })

    return res.status(200).json({
      data: updateUser
    })
  } else if (method === 'DELETE') {

    const { id } = req.body

    await prisma.user.delete({
      where: {
        id,
      }
    })

    return res.status(200).json({ message: 'Successfully deleted' })
  }

  return res.status(404).json({ message: 'Route not found' })
}
