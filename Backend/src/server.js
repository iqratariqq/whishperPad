// const express=require('express');
// const notesRoutes =require('./routes/notesRoutes') if type is not module
import express from "express";
import dotenv from "dotenv";
import cors from "cors"; // Import CORS for handling cross-origin requests


import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimit from "./Middelware/rateLimit.js";
import path from 'path';
dotenv.config(); // Load environment variables from .env file

// For debugging purposes, to check if the environment variable is loaded correctly

const port = process.env.PORT|| 3000; // Use the PORT from .env or default to 5000

//  connectDB();// in this way first serverbstart then db connect but it's not a recommended way

const app = express();

// app.get('/api/notes',(req,res)=>{
//     res.send('you have 5 notes');
// })

// app.post('/api/notes',(req,res)=>{
//     res.status(201).json({message:"Note created successfully!"});
// })

// app.put('/api/notes/:id',(req,res)=>{
//     res.status(200).json({message:"Note updated successfully!"});
// })
//instead of write all of this one by one ,we have common /api/notes ,then write this way

//middleware
app.use(express.json());

//custome Middleware
// app.use((req,res,next)=>{
//     console.log(` requested method ${req.method} and requested url ${req.url}`);
//     next();
// })



app.use(cors({
  origin: "https://react-frontend-sigma-two.vercel.app", // ✅ Your frontend URL,in your case put your localhost 

  credentials: true
}));

app.use(rateLimit); // Apply rate limiting middleware

app.use("/api/notes", notesRoutes);


//first connect to db then start server
// if you want to connect db first then start server, you can use this way
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
