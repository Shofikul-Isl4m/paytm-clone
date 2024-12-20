import mongoose from "mongoose" ;
import { DB_NAME } from "./constants.js";
import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config(
    {
        path : './env'
    }
)

connectDB()
.then (()=>{


    app.on("error : ", (error)=>{
        console.log("ERR :", error);
        throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);})
})


.catch((err)=>{
    console.log("MONGODB CONNECTION FAILED !!! ",err)
})







/*
const app = express()
;(async()=>{
 
   try { 
    await  mongoose.connect(`${mongoose.connect.env.MONGODB_URI}/${DB_NAME}`)
    app.on("error : ", (error)=>{
        console.log("ERR :", error);
        throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log(`app is listening on port ${process.env.PORT}`);
    })

    
   } catch (error) {
    console.error("ERROR : ", error)
    throw err
    
   }


})() */