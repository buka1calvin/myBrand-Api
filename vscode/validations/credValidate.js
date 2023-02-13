import express from "express"
import joi from "joi"
const signUpSchema=joi.object({
    username:joi.string().min(3).required(),
    email:joi.string().min(3).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
.required(),
    password:joi.string().min(6).max(1000).required(),
    password:joi.string().min(6).max(1000).required(),
    isadmin:joi.boolean()
})
const logInSchema=joi.object({
    username:joi.string().min(3).required(),

    password:joi.string().min(6).max(1000).required() 
})
export {signUpSchema,logInSchema}
