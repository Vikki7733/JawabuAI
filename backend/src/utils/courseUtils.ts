// backend/src/utils/courseUtils.ts

import { adminDb } from "../config/firebase";

// Fetch full course data by document reference
export async function fetchCourseDataById(doc: FirebaseFirestore.DocumentSnapshot) {
  const course = { id: doc.id, ...doc.data() };

  // Get all subcourses
  const subcoursesSnapshot = await doc.ref.collection("subcourses").get();
  const subcourses = await Promise.all(subcoursesSnapshot.docs.map(async (subDoc) => {
    const subcourse = { id: subDoc.id, ...subDoc.data() };
    const chaptersSnapshot = await subDoc.ref.collection("chapters").get();
    const chapters = chaptersSnapshot.docs.map(chap => ({ id: chap.id, ...chap.data() }));
    return { ...subcourse, chapters };
  }));

  return { ...course, subcourses };
}

// Find the chapter in all courses
export async function findChapterInCourses(chapterId: string) {
  const coursesSnapshot = await adminDb.collection("courses").get();
  
  for (const courseDoc of coursesSnapshot.docs) {
    const subcoursesSnapshot = await courseDoc.ref.collection("subcourses").get();
    
    for (const subcourseDoc of subcoursesSnapshot.docs) {
      const chapterDoc = await subcourseDoc.ref.collection("chapters").doc(chapterId).get();
      
      if (chapterDoc.exists) {
        return {
          chapterFound: true,
          chapterData: {
            id: chapterDoc.id,
            title: chapterDoc.data()?.title || "",
            chapterDescription: chapterDoc.data()?.chapterDescription || "",
          },
          courseData: { id: courseDoc.id, title: courseDoc.data()?.title || "" },
          subcourseData: { id: subcourseDoc.id, title: subcourseDoc.data()?.title || "" }
        };
      }
    }
  }

  return { chapterFound: false, chapterData: null, courseData: null, subcourseData: null };
}

