import { Hono } from "hono";

import { userRouter } from './user';
import { blogRouter } from "./blog";

export const rootRouter = new Hono()

rootRouter.route('/user', userRouter);
rootRouter.route('/blog', blogRouter);
