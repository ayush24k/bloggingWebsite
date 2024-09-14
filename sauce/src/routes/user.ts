import { Hono } from "hono";

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

import { sign } from "hono/jwt";

const router = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    }
}>();

// sign up route
router.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    try {
        // creating a user
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
            }
        });

        //assigning a jwt token to user for auth
        const JwtPayload = {
            id: user.id
        }

        const JwtSecret = c.env.JWT_SECRET;
        const token = await sign(JwtPayload, JwtSecret);

        return c.json({ jwt: token });

    } catch (e) {
        c.status(403);
        return c.json({ error: "Error While Signing Up" })
    }
});


// signin route
router.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    // finding the user
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
            password: body.password,
        }
    })

    if (!user) {
        c.status(403);
        return c.json({
            error: "User not Found",
        })
    }

    // assigning jwt token
    const JwtPayload = {
        id: user.id
    };
    const JwtSecret = c.env.JWT_SECRET;
    const jwt = await sign(JwtPayload, JwtSecret);

    return c.json({ jwt: jwt })
})


export default router;