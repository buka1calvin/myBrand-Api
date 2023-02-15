import { signUpSchema, logInSchema } from "../validations/credValidate.js";
import signUp from "../../models/signUp.js";
import { Router } from "express";
import  jwt  from "jsonwebtoken";
import passport from "passport";

const router=Router();
import { genSalt, hash, compare } from "bcrypt";
const createAccount= async(req,res)=>{
    const {error,values}=signUpSchema.validate(req.body)
    //this is for checking if he doesn't have an account
    if(error){
        return res.status(400).json(error.details[0].message)
    }
 
        const loginEmail= await signUp.findOne({email:req.body.email})
        const loginUserName=await signUp.findOne({username:req.body.usersname})
        if(loginEmail&&loginUserName){
            return res.status(401).json("you already have an account!")
        }
        else{
            if(loginEmail){
                return res.status(409).json("the Email is already taken!")
            }
        try{
            const salt=await genSalt(10)
            const hashedPwd=await hash(req.body.password,salt)
            const newUser=await new signUp({
                username:req.body.username,
                email:req.body.email,
                password:hashedPwd,
            })  
    //         const token = jwt.sign( {newId:newUser._id} ,process.env.TOKEN_KEY, { expiresIn: '2h'});
    //    newUser.token = token;              
          newUser.save()
            res.status(200).json(newUser)
        }
        catch(error){
            res.status(500).json({messagae:error.message})
        }
    }
}
//this is to get all Created account
const getUsers= async(req,res)=> {
    try {
   const users=await signUp.find();
   res.status(200).json({
    "status":"success",
    "data":users
   })
    }catch (error){
        res.status(404).json({
          "status":"error",
          "message":error.message
        });
    }}
//this is the login part of our database
const accessAccount= async(req,res)=>{
    const {error,values}=logInSchema.validate(req.body)
    if(error){
        res.status(500).json(error.details[0].message)
    }
    try{
       const userSignIn=await signUp.findOne({username:req.body.username})
       !userSignIn && res.status(400).json("wrong identification!")
       const validation=await compare(req.body.password,userSignIn.password)
       !validation && res.status(400).json("wrong password!")
      const payload={
        userId:userSignIn._id,
        username:userSignIn.username,
        email:userSignIn.email,
      }
       const token = jwt.sign( payload ,process.env.TOKEN_KEY, { expiresIn: '2h'});
       userSignIn.token = token;
       const {password,...others}=userSignIn._doc;
       res.json({others})
       }
    catch(error){
        res.status(500).json(error.message)
    }
}

export {createAccount,accessAccount,getUsers}
