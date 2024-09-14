import { Hono } from 'hono'
import rootRouter from './routes/index'; 

const app = new Hono()

app.route('/api/v1', rootRouter);

app.get('/', (c) => {
  return c.text("hello")
})

export default app
