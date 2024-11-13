// backend/src/controller/coursesController.ts
import { adminDb } from "../config/firebase";
import coursesData from "../data/courseData.json";

// Function to initialize courses with subcourses and chapters in Firestore
export async function initializeCourses() {

  try {
    const coursesSnapshot = await adminDb.collection("courses").get();
    if (!coursesSnapshot.empty) {
      console.log("Courses already exist, skipping initialization.");
      return;
    }
    
    for (const course of coursesData) {
        
      const courseRef = adminDb.collection("courses").doc(course.id);
      await courseRef.set({
        title: course.title,
      });


      for (const subcourse of course.subcourses) {
        const subcourseRef = courseRef.collection("subcourses").doc(subcourse.id);
        await subcourseRef.set({ title: subcourse.title });

        for (const chapter of subcourse.chapters) {
          await subcourseRef.collection("chapters").doc(chapter.id).set({
            title: chapter.title,
            chapterDescription: chapter.chapterDescription
          });
        }
      }
    }

    console.log("Courses, subcourses, and chapters initialized.");
  } catch (error) {
    console.error("Error initializing courses:", error);
  }
}