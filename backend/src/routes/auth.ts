import express from "express";
import { registerUser, loginUser, googleLogin, getUserData} from "../controller/authController";
import { getCourses, updateUserProgress, enrollUserInChapter } from "../controller/courseController"

const router = express.Router();

router.post("/register", registerUser);
router.post("/loginUser", loginUser);
router.post("/googleLogin", googleLogin);
router.get("/courses", getCourses);
router.post("/enroll", enrollUserInChapter);
router.get("/user", getUserData);
router.post("/progress", updateUserProgress);

export default router;
