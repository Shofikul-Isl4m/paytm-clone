import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))


app.use(express.json({limit:"16kb"}))
app.use (express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())


//routes

import userRouter from "./routes/user.routes.js"
import accountRouter from "./routes/account.router.js"




//routes declaraion
app.use('/api/v1/users',userRouter);
app.use('/api/v1/account',accountRouter);

export  { app }
