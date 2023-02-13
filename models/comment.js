import { Schema, model } from "mongoose"
const commentSchema=Schema({
    name: String,
    message: String,
    blogId: String,
}
)
export default model("comment",commentSchema)