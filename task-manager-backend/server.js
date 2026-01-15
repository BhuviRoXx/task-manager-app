import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import { connectDB } from "./config/db.js"
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const port = process.env.PORT || 5000;

await connectDB();

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})
app.use("/api/auth", authRouter);
