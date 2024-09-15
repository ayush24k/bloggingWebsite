import { Hono } from "hono";

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from "hono/jwt";
import { createBlogPost, updateBlogPost } from "@ayush24k/blogapp-zod-types";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string,
    }
}>();

// middleware
blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization") || "";

    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            //@ts-ignore
            c.set("userId", user.id);
            await next();
        } else {
            c.status(403);
            return c.json({
                msg: "Your are not logged in!"
            })
        }
    } catch (e) {
        c.status(403);
        return c.json({
            msg: "Your are not logged in!"
        })
    }
})

blogRouter.post('/', async (c) => {
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = createBlogPost.safeParse(body);

    if (!success) {
        c.status(400);
        return c.json({
            msg: "Invalid Inputs",
        })
    }

    try {
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId,
            }
        })

        return c.json({ 
            blogId: blog.id,
            msg: "Blog Created SuccessFully"
         })
    } catch (e) {
        c.status(403)
        return c.json({ msg: "Cant create a blog post" })
    }
});

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = updateBlogPost.safeParse(body);

    if (!success) {
        c.status(400);
        return c.json({
            msg: "Invalid Inputs",
        })
    }

    const blog = await prisma.post.update({
        where: {
            id: body.blogId
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({ 
        blogId: blog.id,
        msg: "Blog Updated Successfully"
     })
});

// add pagintaion 
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany();

    return c.json({ blogs })
})

blogRouter.get('/:id', async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }
        })

        return c.json({
            blog
        });

    } catch (e) {
        c.status(411);
        c.json({ msg: "Error fetching the blog post." })
    }
    return c.json({ msg: "hello" })
});