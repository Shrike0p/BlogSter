import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@shrike0p/medium-common';
import { Hono } from "hono";
import { set } from 'mongoose';

export const BlogRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
      },
      Variables:{
        userId:string
      }
}>()

BlogRouter.use("/*", async(c,next)=>{
    const authHeader=c.req.header('authorization') || "";
    try{
        const user=await verify(authHeader, c.env.JWT_SECRET)

    if(user){
        c.set("userId", user.id as string)
        await next();
    }else{
        c.status(403);
        return c.json({
            message:"You are not logged in"
        })
    }
    }catch(e){
        c.status(403);
        return c.json({
            message:"You are not logged in"
        }) 
    }
    
})

BlogRouter.post('/', async(c)=>{
    const body=await c.req.json();
    const {success}=createBlogInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct"
        })
    }
    const userId=c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog=await prisma.post.create({
        data:{
            title:body.title,
            content:body.content,
            authorId:userId
        }
    })

    return c.json({
        id:blog.id
    })
  })


BlogRouter.put('/', async(c)=>{
    const body=await c.req.json();
    const {success}=updateBlogInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    

    const blog=await prisma.post.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })

    return c.json({
        id:blog.id
    })
  })


   //add pagination
   BlogRouter.get('/bulk', async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs=await prisma.post.findMany({
        select:{
            content:true,
            title:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({
        blogs
    })
  })
  
  
  BlogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    try {
      const blog = await prisma.post.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          title: true,
          content: true,
          author: {
            select: {
              name: true,
            },
          },
        },
      });
  
      if (!blog) {
        return c.json({ message: "Blog not found" }, { status: 404 });
      }
  
      return c.json({
        blog,
      });
    } catch (e) {
      console.error("Error while fetching blog:", e); // Add detailed logging
      return c.json({
        message: "Error while fetching blog",
      }, { status: 500 }); // Use 500 for internal server errors
    }
  });
  
  
 
  