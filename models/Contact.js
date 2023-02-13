import { Schema, model } from "mongoose"
const schema=Schema({
    username:String,
    email:String,
    message:String,
})
export default model("Contact",schema)