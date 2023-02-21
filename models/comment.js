import { Schema, model } from "mongoose"
const commentSchema=Schema({
    email: String,
    message: String,
    blogId: String,
}
)
export default model("comment",commentSchema)