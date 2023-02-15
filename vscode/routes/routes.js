
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

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * "/api/v1/blogs":
 *  get:
 *     tags:
 *     - blogs
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  title:
 *                    type: string
 *       404:
 *         description: bad request
 */
// import adminSignUp from "../../controllers/adminSignUp.js"
router.get("/blogs",getAllBlogs)
/**
 * @swagger
 * "/api/v1/blogs":
 *  post:
 *     tags:
 *     - blogs
 *     summary: Create a Blog
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *       multipart/form-data:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - summary
 *              - content
 *
 *            properties:
 *              title:
 *                type: string
 *                default: football trends
 *              summary:
 *                type: string
 *                default: football trends
 *              picture:
 *                type: file
 *              content:
 *                type: string
 *                default: we can play very well
 *     responses:
 *      200:
 *        description: (blog)
 *      404:
 *        description: Please provide all required details
 *      
 *        
 */
router.post("/blogs",isAuth(passport),upload.single("picture"),createBlogs)
/**
 * @swagger
 * /api/v1/blogs/:id:
 *   get:
 *     tags:
 *       - blogs
 *     summary: Get blog by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: this is  about blog by ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier for the blog.
 *                 title:
 *                   type: string
 *                   description: The title of the blog.
 *                 summary:
 *                   type: string
 *                   description: The summary of the blog.
 *                 picture:
 *                   type: file
 *                   description: The image of the blog.
 *                 content:
 *                   type: string
 *                   description: The content of the blog.
 *       404:
 *         description: Not Found
 */
//this is for getting an obj.id and catching the error
router.get("/blogs/:id",getSingleBlog)

/**
 * @swagger
 * /api/v1/blogs/:id:
 *   patch:
 *     tags:
 *       - blogs
 *     summary: process of Updating blog by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique id of the blog
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: The updated content of the blog
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *               description: The updated title of the blog.
*             content:
 *               type: string
 *               description: The updated content of the blog.
 *             image:
 *               type: file
 *               description: The updated image of the blog.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The updated title of the blog.
 *                 summary:
 *                   type: string
 *                   description: The updated summary of the blog.
 *                 picture:
 *                   type: file
 *                   description: The updated image of the blog.
 *                 content:
 *                   type: string
 *                   description: The updated content.
 *       404:
 *         description: Not Found
 */
router.patch("/blogs/:id",isAuth(passport),upload.single("picture"),updateSingleBlog)
/**
 * @swagger
 * '/api/v1/blogs/:id':
 *  delete:
 *     tags:
 *     - blogs
 *     summary: Remove blog by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - name: id
 *        in: path
 *        description: This is unique id of the blogs
 *        required: true
 *     responses:
 *      200:
 *        description: DELETED SUCCESSFULLY!
 *      404:
 *        description: Not Found
 */

router.delete("/blogs/:id",isAuth(passport),blogDelete)
//these are routes for the contact area
/**
 * @swagger
 * "/api/v1/contacts":
 *  get:
 *     tags:
 *     - contacts
 *     summary: Get all blogs
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  username:
 *                    type: string
 *       404:
 *         description: bad request
 */
router.get("/contacts",getAllContacts)
//posting a single blog
/**
 * @swagger
 * "/api/v1/contacts":
 *  post:
 *     tags:
 *     - contacts
 *     summary: Create a Blog
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - message
 *
 *            properties:
 *              id:
 *                type: number and vowels
 *                default: 23sldf3353453e
 *              username:
 *                type: string
 *                default: Bukarani Calvin
 *              email:
 *                type: string
 *                default: calvinbukarani@gmail.com
 *              message:
 *                type: string
 *                default: we can play very well
 *     responses:
 *      200:
 *        description: (blog)
 *      404:
 *        description: Please provide all required details
 *      
 *        
 */

router.post("/contacts",createMessage);
/**
 * @swagger
 * /api/v1/blogs/:Cid:
 *   get:
 *     tags:
 *       - contacts
 *     summary: Get message by id
 *     parameters:
 *       - name: id
 *         in: path
 *         description: this is  about message by ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier for the contact.
 *                 username:
 *                   type: string
 *                   description: Bukarani Calvin.
 *                 email:
 *                   type: string
 *                   description: email@gmail.com.
 *                 message:
 *                   type: string
 *                   description: This is the message about the overview of the blog.
 *       404:
 *         description: Not Found
 */
router.get("/contacts/:Cid",getSingleMessage);
/**
 * @swagger
 * '/api/v1/contacts/:id':
 *  delete:
 *     tags:
 *     - contacts
 *     summary: Remove contact by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: This is unique id of the contacts
 *        required: true
 *     responses:
 *      200:
 *        description: DELETED SUCCESSFULLY!
 *      404:
 *        description: Not Found
 */
router.delete("/contacts/:Cid",deleteMessage);
//these are routes for signIn and logIn
/**
 * @swagger
 * "/api/v1/signup":
 *  post:
 *     tags:
 *     - signup
 *     summary: user registration
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: Bukarani
 *              email:
 *                type: string
 *                default: buka@gmail.com
 *              password:
 *                type: string
 *                default: 1Qwdjkjdkjd12    
 *     responses:
 *      200:
 *        description: User registered Successfully
 *      401:
 *        description: You already have an account!
 *      409:
 *        description: Email already taken. Please use another email."    
 */
router.post("/signup",createAccount)
//this is the signup for the admin
/**
 * @swagger
 * "/api/v1/adminSignUp":
 *  post:
 *     tags:
 *     - adminsignUp
 *     summary: Admin Registration
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: Calvin
 *              email:
 *                type: string
 *                default: Calvin@gmail.com
 *              password:
 *                type: string
 *                default: 1Qwdjkjdkjd12    
 *     responses:
 *      200:
 *        description: User registered Successfully
 *      401:
 *        description: You already have an account!
 *      409:
 *        description: Email already taken. Please use another email."    
 */
router.post("/adminSignup",adminSignUp)
/**
 * @swagger
 * "/api/v1/login":
 *  post:
 *     tags:
 *     - login
 *     summary: Login of te user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - password
 *            properties:
 *              username:
 *                type: string
 *                default: bukarani calvin
 *              password:
 *                type: string
 *                default: 463736764jhcxhjhdfkjhe
 *              
 *     responses:
 *      200:
 *        description: login successfull
 *      400:
 *        description: user doesn't exist
 *      403:
 *        description: password is invalid
 *      
 */
router.post("/login",accessAccount)
//this is for the comment session
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - blog
 *         - name
 *         - message
 *       properties:
 *         blog:
 *           type: string
 *           description: The unique identifier of the associated blog.
 *         name:
 *           type: string
 *           description: The name of the commenter.
 *         comment:
 *           type: string
 *           description: The comment text.
 *
 * /api/v1/blogs/{id}/comments:
 *   post:
 *     tags:
 *       - comments
 *     summary: Create a new comment for a blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique id of the blog
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Comment object to be created
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: comment not found 
 */
router.post("/blogs/:id/comments",createComment)
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - id
 *         - blog
 *         - name
 *         - comment
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the comment.
 *         blog:
 *           type: object
 *           description: The blog associated with the comment.
 *           properties:
 *             id:
 *               type: string
 *               description: The unique identifier for the blog.
 *             title:
 *               type: string
 *               description: The title of the blog.
 *             content:
 *               type: string
 *               description: The content of the blog.
 *             summary: 
 *               type: string
 *               description: the summary of the blog
*             
 *             image:
 *               type: file
 *               description: The image of the blog.
 *         name:
 *           type: string
 *           description: The name of the commenter.
 *         comment:
 *           type: string
 *           description: The comment text.
 *
 * /api/v1/comments:
 *   get:
 *     tags:
 *       - comments
 *     summary: Get all comments with associated blogs
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 */
router.get("/blogs/:id/comments",getComments)
//this is for the likes
/**
 * @swagger
 * /api/v1/blogs/:id/likes:
 *   post:
 *     tags:
 *       - blogs
 *     summary: Update the number of likes for a blog
 *     parameters:
 *       - name: id
 *         in: path
 *         description: this is the unique id where every like  clicked will be sent
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes:
 *                   type: number
 *                   description: The updated number of likes for the blog.
 *       404:
 *         description: Not Found
 */
router.post("/blogs/:id/likes",postLikes)
export default router
