// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid, url, desc } = req.body
  const id = Math.random().toString(36).substr(2, 6)
  const existUrl = await prisma.link.findMany({ where: { url } })

  if (existUrl.length !== 0) {
    return res.status(201).json(existUrl[0].linkId)
  }

  try {
    await prisma.link.create({
      data: {
        userId: uid,
        description: desc,
        url,
        linkId: id,
      },
    })

    // const returnedData = {
    //   success: true,
    //   linkID: id,
    //   message: "Link created successfully!",
    // }

    res.status(201).json(id)
  } catch (err) {
    console.log(err)
    res.status(401).json(err)
  }
}
