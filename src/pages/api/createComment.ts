import { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

interface ResponseData {
  success: boolean,
  err?: any
}

const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2021-08-31'
}

const client = sanityClient(sanityConfig)

export default async function createComment (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
  ) {
  const { _id, name, email, comment} = req.body

  try {
    await client.create({
      _type: 'comment',
      name,
      email,
      comment,
      post: {
        _type: 'reference',
        _ref: _id
      },
    })
  } catch (err: any) {
    console.log(err)
    return res.status(500).json({ success: false, err })
  }

  return res.status(200).json({ success: true })
}
