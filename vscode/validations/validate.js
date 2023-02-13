import joi from "joi"
const blogschema=joi.object({
    title:joi.string().min(3).required(),
    summary:joi.string().min(3).required(),
    picture:joi.string(),
    content:joi.string().min(10).max(1000).required() 
})
const contactSchema=joi.object({
    username:joi.string().min(3).required(),
    email:joi.string().min(3).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
.required(),
    message:joi.string().min(10).max(1000).required() 
})
export {blogschema,contactSchema}
