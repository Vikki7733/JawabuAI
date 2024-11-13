import express from "express";
import authRoutes from "./routes/auth";
import cors from "cors";
import dotenv from "dotenv";
import { initializeCourses } from "./utils/insertCourses";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;
// Middleware
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend app to make requests
  methods: 'GET,POST',
  credentials: true
}));

initializeCourses()
  .then(() => {
    console.log("Courses are initialized.");
  })
  .catch((error: any) => {
    console.error("Error inserting course data:", error);
  });

// Routes
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
export default app;
