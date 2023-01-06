import mongoose from "mongoose";
import dotenv from "dotenv";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../.env") });

const DB = process.env.DB.replace(
    "<password>",
    process.env.DB_PASSWORD
);

export default async function connectDB() {
    try {
        const connection = await mongoose.set("strictQuery", false).connect(DB);
        console.log(`Connected to MongoDB: ${connection.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}