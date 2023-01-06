import express from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";
import colors from "colors";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import connectDB from "./config/db.js";
import errorHandler from "./config/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js";


// Set up environment variables
dotenv.config({ path: "/.env" });

// Connect to database
connectDB();

// Set up express app
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: true, limit: "10kb"}));
app.use(cookieSession({ keys: [process.env.COOKIE_SESSION_KEY]}));
app.use(cors());
app.use(compression());
app.use(helmet());

// Set up routes
const baseURL = "/api/v1";
app.use(`${baseURL}/users`, userRoutes);
app.use(`${baseURL}/carts`, cartRoutes);
app.use(`${baseURL}/products`, productRoutes);


// Set up error handling middleware. It does not log error.stack when process.env.NODE_ENV===production
app.use(errorHandler);

// Start express app
app.listen(port, () => {console.log(`ecommerce-cdp listening on ${port}...`.black.bgCyan)});