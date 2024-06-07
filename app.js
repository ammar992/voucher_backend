
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";


export const app = express();
app.use(cors({
    origin:process.env.origin,
    credentials:true
}));
app.use(cookieParser());
app.use(express.json({ limit: '16kb' }));
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));


////////// routes 


import userRoutes from "./src/routes/user.route.js";
import VoucherRoutes from "./src/routes/voucher.route.js"


app.use("/api/v1/user",userRoutes);
app.use("/api/v1/voucher",VoucherRoutes);

