import comment from "../models/comment.js";
import Post from "../models/Post.js";
const createComment = async (req, res, next) => {
        let Id = req.params.id
        const Comment = new comment({
                    name: req.body.name,
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
                    const messages = Comments.map(Comment => Comment.message);
                    res.status(200).json({ messages });
                } catch (err) {
                    res.status(404).json(err);
                }
            };        

  export {createComment,getComments}
  