import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://japancard-frontend.vercel.app",
      "https://japancard-frontend-git-main-bimapopo81.vercel.app",
      "https://japancard-frontend-bimapopo81.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Add health check route
app.get("/", (req, res) => {
  res.json({ message: "Japan Card API is running" });
});
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Import routes
import wordRoutes from "./routes/words.js";
import translationRoutes from "./routes/translations.js";

// Use routes
app.use("/api/words", wordRoutes);
app.use("/api/translate", translationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
