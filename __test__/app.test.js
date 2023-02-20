import { json } from "express";
import  request  from "supertest";
import app from "../index.js";
import killPort from "kill-port";
import mongoose from "mongoose";
import path from "path"
import Post from "../models/Post.js";
jest.setTimeout(200000);
describe("This is the server and tests container",()=>{
    beforeAll(async()=>{
        await mongoose.connect("mongodb+srv://Buka-Dev:DestructorX@buka-devapps.lyhjr8f.mongodb.net/test?retryWrites=true&w=majority")
    })
    afterAll(async()=>{
        await mongoose.disconnect()
    })
    //getting All Blogs
describe("i expect that all blogs are being got",()=>{
test("i should get all blogs",async()=>{
    const allBlogs=await request(app).get("/api/v1/blogs").expect(200)
})
})
// posting a blog
describe("Post Blog",()=>{
    test("posting A blog with empty field",async()=>{
        await request(app).post("/api/v1/blogs").send({}).expect(401)
    }) 
    // test("posting with values",async()=>{
    //     await request(app).post("/api/v1/blogs").field("title","blog1").field("summary","this is about blog1")
    //     .field("content","this is the content ablout blog1")
    //     .field("picture",path.resolve(__dirname,"../img-testing/register.png")).expect(200)
    // },40000)
})
//getting single blog
describe("dispaly single blog/delete/post",()=>{
    test("this is about getting a single blog",async()=>{
        const singleBlog=await request(app).get("/api/v1/blogs/63de2caf33dd6f7662d53af0").expect(200)
    })
})
describe("Get Single Blog",()=>{
    test("single Blog",async()=>{
        await request(app).get("/api/v1/blogs/63de2caf33dd6f7662d0").expect(500)
    })
})
//this is about posting 
//this for deleting blogs
describe("Delete Blog",()=>{
    test("this is about getting a single blog",async()=>{
        const deleteBlog=await request(app).delete("/api/v1/blogs/63e733ad13e476f58d26fd21").expect(401)
    })
})
                /*this is about message*/

//getting alist of messages
describe("let me try to get a list of contacts",()=>{
    test("i expect to get a list of contacts",async ()=>{
        const getAllCont=await request(app).get("/api/v1/contacts").expect(200)
    })
})
//creating a message
describe("Post Message",()=>{
    test("posting a message",async()=>{
        await request(app).post("/api/v1/contacts").send({}).expect(400)
    })
    test("posting a message with values",async()=>{
    const messaging={
        username:"calvin",
        email:"calvinbukarani@yahoo.com",
        message:"hello everyone i hope you're doing great"
    }
    await request(app).post("/api/v1/contacts").send(messaging).expect(200)
    })
})
//getting a single message
describe("this is about single message",()=>{
    test("this about getting the single blog with id",async()=>{
        const singleMessage=await request(app).delete("/api/v1/contacts/63dba1c760ab6d7bda4186a8").expect(200)
    })
})
                /*this is about the signin part*/
describe("Post SignIn",()=>{
    test("this is about signIn when there are send without identification",async()=>{
        await request(app).post("/api/v1/signup").send({}).expect(400)
    })
    const testing={
        username:"bdhghdg",
        email:"ddghjgdhg@gmail.com",
        password:"gdhdghgdh"
    }
    test("this is about signIn when there are send without identification",async()=>{
        await request(app).post("/api/v1/signup").send(testing).expect(401)
    })
})
//this is for the admin SignIn
describe("Admin POST",()=>{
    test("this is about AdminSignUp when there are send without identification",async()=>{
        await request(app).post("/api/v1/adminSignup").send({}).expect(400)
    })
    const Adtesting={
        username:"bdxxxxxxx",
        email:"ddghxxxxx@gmail.com",
        password:"gdhdghgdhghghjghj"
    }
    test("this is about signIn when there are send with identification",async()=>{
        await request(app).post("/api/v1/adminSignup").send(Adtesting).expect(200)
    })
    const Adtesting1={
        username:"first adminUser",
        email:"firstAdminUser@gmail.com",
        password:"thisismyAdminPassword"
    }
    test("this is about signIn when there are send with identification",async()=>{
        await request(app).post("/api/v1/adminSignup").send(Adtesting1).expect(200)
    })
})
describe("login POST",()=>{
    test("this is about the logIn when there are send with identification",async()=>{
        const result=await request(app).post("/api/v1/login").send({
            username : "first user",
            password:"thisismypassword"
        })                      
        .expect(200)
    }) 
    test("this is about the logIn when there are send with admin identification",async()=>{
        const result=await request(app).post("/api/v1/login").send({
            username : "first adminUser",
            password:"thisismyAdminPassword"
        })                      
        .expect(200)
    }) 
    // test("this is about the logIn when there are send with identification",async()=>{
    //     const logn={
    //         username:"buka@gmail.com",
    //         password:"dhnbdnbdsbdnsbnbsd"
    //     }
    //     const result=await request(app).post("/api/v1/login").send(logn)
    //     let token=result.body.secretOrKey                   
    //     .expect(400)
    // }) 
})
describe("comment Post",()=>{
    test("this is about comments when there are send with identification",async()=>{
       const {body}=await request(app).post("/api/v1/blogs/63dbe0ad0d9dda20f4e9e440/comments").send({
            name:"my name",
            message : "my message",
        }).expect(201)
    })
})
describe("comment Get",()=>{
    test("this is about comments when there are received with identification",async()=>{
       await request(app).get("/api/v1/blogs/63dbe0ad0d9dda20f4e9e440/comments").expect(200)
    })
})

})
