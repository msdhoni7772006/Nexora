
import "dotenv/config";
import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);

connectToSocket(server);

app.set("port", process.env.PORT || 8000);

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

// Root health endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Nexora API is running!",
        status: "OK"
    });
});

// User API routes
app.use("/api/v1/users", userRoutes);

const start = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
            throw new Error("MONGODB_URI environment variable is missing");
        }

        const connectionDb = await mongoose.connect(mongoUri);

        console.log(`MongoDB connected: ${connectionDb.connection.host}`);

        server.listen(app.get("port"), "0.0.0.0", () => {
            console.log(`Nexora server listening on port ${app.get("port")}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

start();

