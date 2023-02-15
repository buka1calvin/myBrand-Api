
import Post from "../models/Post.js"
import { blogschema} from "../vscode/validations/validate.js"
//this is for getting the whole 
const getAllBlogs=async(req,res)=>{
    const blogs=await Post.find()
    return res.status(200).json(blogs)  
}
const createBlogs=async(req,res)=>{
    const {error,values}=blogschema.validate(req.body)
     if(error){
         return res.status(400).send({message:"no input"})
    }
    else{
        const post=new Post({
            title:req.body.title,
            summary:req.body.summary,
            picture:req.file.path,
            content:req.body.content
        })
        await post.save()
        return res.status(200).send(post) 
    }         
}
const getSingleBlog=async(req,res)=>{
          try{
        const {id:newId}=req.params
        const post=await Post.findOne({
            _id:newId
        })
        if(!post){
            res.status(404).json({message:`this ${newId} doesn't exist!`})
        }
        res.status(200).send(post)
     }
     catch(error){
        res.status(500).json({message:error.details})
    }
}
const updateSingleBlog=async(req, res)=>{
    try {
        const {id:newId}=req.params
        const post = await Post.findOneAndUpdate({ _id:newId},req.body,{new:true})
        if(!post){
            return res.status(404).json( { msg: `No Blog with id : ${newId}` } )        
        }
        else{
            return res.status(200).send({post}) 
        }
    } catch {
        res.status(500)
        res.send({ error: "Post doesn't exist!" })
    }
}
const blogDelete=async(req,res)=>{
    try{
    await Post.deleteOne({
        _id:req.params.id,
    })
    res.status(200).send("DELETED SUCCESSFULLY!")
}
catch{
    res.status(404).json({error:"post doesn't exist!"})
}
}
const postLikes=async(req,res)=>{
    const like = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $inc: { likes: 1 } },
        { upsert: true, new: true }
      );
      
      res.json({ likes: like.likes });  
}
export {getAllBlogs,createBlogs,getSingleBlog,updateSingleBlog,blogDelete,postLikes}
