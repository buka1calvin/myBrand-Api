import { contactSchema } from "../vscode/validations/validate.js"
import Contact from "../models/Contact.js"
//this is about contacts
const getAllContacts=async(req,res)=>{
    const contacts=await Contact.find()
    return res.status(200).send(contacts)
}
const createMessage=async(req,res)=>{
        const {error}=contactSchema.validate(req.body)
        if(error){
            return res.status(400).send({message:error.message})
        }
        else{
    const contact=new Contact({
        username:req.body.username,
        email:req.body.email,
        message:req.body.message
    })
    await contact.save()
    res.send(contact);
    console.log(contact)
}
    }
const getSingleMessage=async(req,res)=>{
    try{
        const {Cid:contID}=req.params
    const contact=await Contact.findOne({
        _id:contID
    })
    if(!contact){
        res.status(404).json({message:`this ${contID} doesn't exist!`})
    }
    res.send(contact)
}
catch{
    res.status(404).json({error:"there's no such ID"});
}
}
const deleteMessage=async(req,res)=>{
    try{
        
    await Contact.deleteOne({
        id:req.params.id
    })

    res.send("deleted successfully!")
}
catch{
    res.status(404).json({error:"post doesn't exist!"})
}
}
export {getAllContacts,createMessage,getSingleMessage,deleteMessage}