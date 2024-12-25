import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/dbConnect.js";
connectDB();
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Running at PORT - ${PORT}`);
});

app.use("/api/v1/auth", authRoutes);
