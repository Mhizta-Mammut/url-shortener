// This is an example of to protect an API route
import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function protectedHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  const { uid } = req.body

  if (session) {
    //do prisma fetch
    try {
      //
      await prisma.link.findMany({ where: { userId: uid } })
      return res.send({
        data: "This is protected content. You can access this content because you are signed in.",
      })
    } catch (err) {
      console.log(err)
      res.status(401).json(err)
    }
  }

  res.send({
    error: "You must be sign in to view the protected content on this page.",
  })
}
