// backend/server.js
import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { connectToDB } from './db.js';

import apiRoutes from './routes/api.js'



const app = new Koa();
const router = new Router()


app.use(bodyParser())
app.use(router.routes())

const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectToDB();

app.use(apiRoutes)

// Close the MongoDB connection when the server is terminated



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
