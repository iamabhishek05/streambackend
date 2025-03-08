import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

// configuration for handling CORS error 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// configuration for handling requests from and convert them into JSON
app.use(express.json({limit: "1mb"}));

// configuration for handling requests coming from forms or url 
app.use(express.urlencoded({extended: true , limit:"1mb"}  ));

// It makes the cookies available in req.cookies for easy access within your route handlers.
app.use(cookieParser());


// routes import
import userRouter from './routes/user.routes.js';


// routes declaration
app.use("/api/v1/users",userRouter)


export {app}