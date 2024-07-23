import { Hono } from 'hono'
import { UserRouter } from './routes/User'
import { BlogRouter } from './routes/Blog';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string;
    JWT_SECRET:string;
  },
  Variables: {
    userId: string;
  }


}>()


app.use('/*', cors())
app.route('/api/v1/user', UserRouter)
app.route('/api/v1/blog', BlogRouter)





export default app