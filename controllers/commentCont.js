import comment from "../models/comment.js";
import Post from "../models/Post.js";
const createComment = async (req, res, next) => {
        let Id = req.params.id
        const Comment = new comment({
                    email: req.body.email,
                    message: req.body.message,
                    blogId:Id
                   
                });
                await Comment.save()
                res.status(201).json({comment:Comment})
                const blogRelated = await Post.findById(Id);
                   blogRelated.comments.push(Comment);
                   await blogRelated.save()
          
            }
const getComments = async (req, res) => {
                try {
                    const blogId = req.params.id;
                    const Comments = await comment.find({ blogId });
                    const messages = Comments.map(Comment => Comment);
                    res.status(200).json({ messages });
                } catch (err) {
                    res.status(404).json(err);
                }
            };    
            const getAllComments = async (req, res) => {
                try {
                    const commentss=await comment.find()
                    res.status(200).json(commentss);
                } catch (error) {
                    res.status(404).json(error);
                }
            };        
 const delComment=async(req,res)=>{
                try{
                await comment.deleteOne({
                    _id:req.params.id,
                })
                res.status(200).send("DELETED SUCCESSFULLY!")
            }
            catch{
                res.status(404).json({error:"post doesn't exist!"})
            }
            }
  export {createComment,getComments,getAllComments,delComment}
  