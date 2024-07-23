import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import zod from "zod"
import { Hono } from "hono";
import { signup, signin} from '@shrike0p/medium-common';

export const UserRouter=new Hono<{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
      }
}>();
  



UserRouter.post('/signup', async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    const body=await c.req.json();
    const {success}=signup.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not Correct"
        })
    }
    try {
      const user=await prisma.user.create({
        data:{
          email:body.email,
          password:body.password,
          name:body.name
        }
      });
      const jwt=await sign({id:user.id}, c.env.JWT_SECRET)
      return c.text(jwt);
    }catch(e){
      console.log(e);
      c.status(403);
      return c.text('Invalid')
    }
    
  })
  
  UserRouter.post('/signin', async(c)=>{
    const body=await c.req.json();
    const { success }= signin.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
            message:"Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
    try{
    
    const user=await prisma.user.findUnique({
        where:{
          email:body.email
        }
      })
  
      if(!user){
        c.status(403);
        return c.json({message:'User not found'})
      }
  
      const jwt= await sign({id:user.id}, c.env.JWT_SECRET)
      return c.text(jwt)
  
    }catch(e){
      console.log(e);
      c.status(411);
      return c.text('Invalid')
    }
  })