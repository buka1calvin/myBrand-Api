
import { Schema, model } from "mongoose"
const schema=Schema({
    title:String,
    summary:String,
    picture:String,
    content:String,
    comments:[
      {
        type: Schema.Types.ObjectId,
       ref: 'comment'
      }
    ],
    likes:{
      type:Number,
      default:0
    }
      })
export default model('Post',schema)
