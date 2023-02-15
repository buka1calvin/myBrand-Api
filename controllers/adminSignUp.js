import signUp from "../models/signUp.js";
import {signUpSchema,logInSchema} from "../vscode/validations/credValidate.js"
import { genSalt, hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
const adminSignUp=async(req,res)=>{
    const {error,values}=signUpSchema.validate(req.body)
    //this is for checking if he doesn't have an account
    if(error){
        return res.status(400).json(error.details[0].message)
    }
 
        const loginmail= await signUp.findOne({email:req.body.email})
        const loginUserName=await signUp.findOne({username:req.body.usersname})
        if(loginmail&&loginUserName){
            return res.status(200).json("you already have an account!")
        }
        else{
            // if(loginmail){
            //     return res.status(200).json("the Email is already taken!")
            // }
        try{
            const salt=await genSalt(10)
            const hashedPwd=await hash(req.body.password,salt)
            const newUser=await new signUp({
                username:req.body.username,
                email:req.body.email,
                password:hashedPwd,
                role:"admin"
            })                
          newUser.save()
            res.status(200).json(newUser)
        }
        catch(error){
            res.status(500).json({messagae:error.message})
        }
    }
}
export default adminSignUp
