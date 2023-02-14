
import { Router } from "express"
const router=Router()
import upload from "../imageconfig/cloudinary.js"
import { getAllBlogs, createBlogs, getSingleBlog, updateSingleBlog, blogDelete,postLikes } from "../../controllers/blogController.js"
import { getAllContacts, createMessage, getSingleMessage, deleteMessage } from "../../controllers/contactContoller.js"
import { createAccount, accessAccount,getUsers} from "./auth.js"
import passport from "passport"
import {createComment,getComments} from "../../controllers/commentCont.js"
import isAuth from "./middlewares/authentication.js"
import isAdmin from "./middlewares/adminValidate.js"
import adminSignUp from "../../controllers/adminSignUp.js"
// import adminSignUp from "../../controllers/adminSignUp.js"
router.get("/blogs",getAllBlogs)
//these are routes for the contact area
router.get("/contacts",getAllContacts)
export default router
router.post("/blogs",upload.single("picture"),createBlogs)
//this is for getting an obj.id and catching the error
router.get("/blogs/:id",getSingleBlog)
router.patch("/blogs/:id",isAuth(passport),isAdmin,upload.single("picture"),updateSingleBlog)
router.delete("/blogs/:id",blogDelete)
//these are routes for the contact area
router.post("/contacts",createMessage);
router.get("/contacts/:Cid",getSingleMessage);
router.delete("/contacts/:Cid",deleteMessage);
//these are routes for signIn and logIn
router.post("/signup",createAccount)
router.post("/adminSignup",adminSignUp)
router.post("/login",accessAccount)
//this is for the comment session
router.post("/blogs/:id/comments",createComment)
router.get("/blogs/:id/comments",getComments)
//this is for the likes
router.post("/blogs/:id/likes",postLikes)

