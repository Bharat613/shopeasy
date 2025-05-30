import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './configs/db.js';
import 'dotenv/config'
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectClodinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebHooks } from './controllers/orderController.js';

const app = express();

const port = process.env.PORT || 4000;

await connectDB()
await connectClodinary()

//allow multiple origins
const allowedOrigins = ['http://localhost:5173','https://shopeasy-alpha.vercel.app']
app.post('/stripe',express.raw({type:'application/json'}), stripeWebHooks)





//middleware configiartions
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,  credentials:true}));




// Disable caching for auth routes
const disableCaching = (req, res, next) => {
   res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
   res.setHeader('Pragma', 'no-cache');
   res.setHeader('Expires', '0');
   next();
 };
 
 // Apply to logout and is-auth routes
 app.use('/api/user/logout', disableCaching);
 app.use('/api/user/is-auth', disableCaching);
 
app.get('/', (req, res)=>res.send("API is working"));
app.use('/api/user',userRouter)
app.use('/api/seller',sellerRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/order',orderRouter)



 app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
 })