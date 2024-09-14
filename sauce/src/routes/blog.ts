import { Hono } from "hono";

const router = new Hono()

router.post('/blog', (c) => {
    return c.json({msg: "hello"})
  })
  
router.put('/blog', (c) => {
    return c.json({msg: "hello"})
  })
  
router.get('/blog/:id', (c) => {
    return c.json({msg: "hello"})
  })
  
router.get('/blog/bulk', (c) => {
    return c.json({msg: "hello"})
  })


export default router;