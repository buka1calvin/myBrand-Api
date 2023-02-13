import { Schema, model } from "mongoose"
import LocalStrategy from 'passport-local'
const schema=Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    password:{
        type:String,
    },
    token:String,
    role:{
        type:String,
        default:"user"
    },
})
export default model('signUp',schema)