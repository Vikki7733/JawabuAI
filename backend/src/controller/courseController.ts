// backend/src/controller/coursesController.ts

import { Request, Response } from "express";
import { adminDb } from "../config/firebase";
import * as admin from "firebase-admin";
import { fetchCourseDataById, findChapterInCourses } from "../utils/courseUtils";
import { verifyJWT } from "../utils/jwtToken";

interface CourseProgress {
  courseId: string;
  progress: number;
}

// Fetch all courses with subcourses and chapters
export async function getCourses(req: Request, res: Response): Promise<any> {
  try {
    const coursesSnapshot = await adminDb.collection("courses").get();
    const courses = await Promise.all(coursesSnapshot.docs.map(fetchCourseDataById));
    return res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ error: "Failed to fetch courses" });
  }
}

// Update user progress in enrolled courses
export async function updateUserProgress(req: Request, res: Response): Promise<any> {
  const { userId, courses }: { userId: string; courses: CourseProgress[] } = req.body;

  try {
    const userRef = adminDb.collection("users").doc(userId);
    const enrolledCoursesSnapshot = await userRef.collection("enrolledCourses").get();

    if (enrolledCoursesSnapshot.empty) {
      return res.status(404).json({ error: "User is not enrolled in any courses" });
    }

    const enrolledCourses = enrolledCoursesSnapshot.docs.reduce((acc: any, doc) => {
      acc[doc.id] = doc.data();
      return acc;
    }, {});

    const batch = adminDb.batch();
    const updatedCourses = courses.filter(({ courseId, progress }) => {
      if (!enrolledCourses[courseId]) {
        res.status(404).json({ error: `User not enrolled in course ${courseId}` });
        return false;
      }
      const courseRef = userRef.collection("enrolledCourses").doc(courseId);
      batch.update(courseRef, {
        progress: admin.firestore.FieldValue.increment(progress),
        updatedAt: new Date(),
      });
      return true;
    });

    await batch.commit();

    res.json({
      message: "Progress updated successfully",
      updatedCourses,
    });
  } catch (error) {
    console.error("Error updating course progress:", error);
    res.status(500).json({ error: "Failed to update course progress" });
  }
}

// Enroll user in chapters by ID
export async function enrollUserInChapter(req: Request, res: Response): Promise<any> {
  console.log("Request Body:", req.body);
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  const decoded = verifyJWT(token);
  const userId = decoded.uid;
  let { chapterIds } = req.body;

  if (typeof chapterIds === "string") {
    chapterIds = [chapterIds];
  }

  if (!Array.isArray(chapterIds) || chapterIds.length === 0) {
    return res.status(400).json({ error: "Invalid or missing chapterIds" });
  }

  try {
    const userDoc = await adminDb.collection("users").doc(userId).get();
    if (!userDoc.exists) return res.status(404).json({ error: "User not found." });

    const batch = adminDb.batch();
    const enrolledChapters = [];
    const responseMessages = [];
    const notFoundChapters = [];

    for (const chapterId of chapterIds) {
      console.log("Processing chapterId:", chapterId);
      const enrollmentRef = adminDb.collection("users").doc(userId).collection("enrolledChapters").doc(chapterId);

      // Check if the user is already enrolled in this chapter
      const enrollmentDoc = await enrollmentRef.get();
      if (enrollmentDoc.exists) {
        responseMessages.push(`Chapter ${chapterId} already enrolled, skipping.`);
        continue;
      }

      // Find the chapter in courses
      const { chapterFound, chapterData, courseData, subcourseData } = await findChapterInCourses(chapterId);
      console.log(`Chapter found: ${chapterFound}, chapterData:`, chapterData);

      if (!chapterFound || !chapterData || !courseData || !subcourseData) {
        responseMessages.push(`Chapter ${chapterId} not found in any course, skipping.`);
        notFoundChapters.push(chapterId);
        continue;
      }

      const enrollmentData = {
        progress: 0,
        enrolledAt: new Date(),
        ...courseData,
        ...subcourseData,
        ...chapterData,
        path: `/courses/${courseData.id}/subcourses/${subcourseData.id}/chapters/${chapterData.id}`,
        chapterTitle: chapterData.title
      };

      batch.set(enrollmentRef, enrollmentData);
      enrolledChapters.push({ chapterId: chapterData.id, ...courseData, ...subcourseData });
      responseMessages.push(`Enrolled in chapter ${chapterData.title}.`, enrollmentData);
    }

    await batch.commit();

    responseMessages.push("Enrolled chapters:", enrolledChapters);

    res.json({
      message: "User enrollment processed.",
      responseMessages,
      enrolledChapters,
      notFoundChapters: notFoundChapters.length > 0 ? notFoundChapters : undefined,
    });
  } catch (error) {
    console.error("Error enrolling user in chapters:", error);
    res.status(500).json({ error: "Failed to enroll user in chapters" });
  }
}
