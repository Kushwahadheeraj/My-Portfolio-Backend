import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import cloudinary from "cloudinary";
import { dbConnection } from './database/database.js';
import { errorMiddleware } from './middlewares/errors.js';
import messageRouter from './routes/messageRouter.js';
import userRouter from './routes/userRouter.js';
import timelineRouter from './routes/timelineRouter.js';
import applicationRouter from './routes/softwareApplicationRouter.js';
import skillRouter from './routes/skillRouter.js';
import projectRouter from './routes/projectRouter.js'

const app=express();

dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.PORTFOLIO_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use('/api/v1/timeline',timelineRouter);
app.use('/api/v1/application',applicationRouter);
app.use('/api/v1/skill',skillRouter);
app.use('/api/v1/project',projectRouter);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dbConnection();
app.use(errorMiddleware)

app.listen(process.env.PORT,()=>{
    console.log(`Server is runing PORT ${process.env.PORT}`)
})
