// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../utils/database'

type ErrorResponseType = {
  error: string
}

export interface CommentType {
  _id: number | undefined
  name: string
  message: string
  currentVideo: string
  active: boolean
  date: Date

}

type ResponseCommentType = {
  CommentType: {}
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | ResponseCommentType | any >
): Promise<void> {
  

  if( req.method === "POST"){
    const {db} = await connect()
    
    const {name, message, currentVideo} = req.body

    if(!name && !message){
      return res.status(400).json({ error: "Missing body parameter" })
    }

    const response = await db.collection('comments').insertOne({
      name,
      message,
      currentVideo,
      active: true,
      date: new Date()
    
    })
  
    if(response){

      const comment = await db.collection('comments').findOne({_id: response.insertedId})

      if(comment) return res.status(200).json(comment)

      
      return res.status(400).json({error: "failed"})
    }

    res.status(400).json({error: "Failed create commet"})
  }
  
  
  else if(req.method === "GET"){
    const {db} = await connect()
    const {limit, video} = req.query

    const count = await db.collection('comments').find({currentVideo: video}).count()

    console.log(count)

    db.collection('comments').find({currentVideo: video}).sort({"date": -1}).limit(Number(limit)).toArray(function(err, comments){
      if(err) throw err

      res.status(200).json({totalcomment: count, comments})
    })
    return

  }


  return res.status(400).json({ error: "Wrong request method" })
  
}
