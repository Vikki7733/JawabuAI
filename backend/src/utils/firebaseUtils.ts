// utils/firebaseUtils.ts
import { adminDb, adminAuth } from "../config/firebase";

export async function fetchUserByEmail(email: string) {
  const userSnapshot = await adminDb.collection("users").where("email", "==", email).get();
  return userSnapshot.empty ? null : userSnapshot.docs[0];
}

export async function fetchUserById(userId: string) {
  const userSnapshot = await adminDb.collection("users").doc(userId).get();
  return userSnapshot.exists ? userSnapshot.data() : null;
}

export async function fetchEnrolledChapters(userId: string) {
  const enrolledChaptersSnapshot = await adminDb.collection("users").doc(userId).collection("enrolledChapters").get();
  return enrolledChaptersSnapshot.docs.map(doc => ({
    id: doc.id,
    title: doc.data().chapterTitle,
    progress: doc.data().progress || 0,
    subcourseId: doc.data().subcourseId,
    subcourseTitle: doc.data().subcourseTitle,
    enrolledAt: doc.data().enrolledAt,
    updatedAt: doc.data().updatedAt
  }));
}

export async function fetchAvailableCourses() {
  const coursesSnapshot = await adminDb.collection("courses").get();
  return await Promise.all(coursesSnapshot.docs.map(async courseDoc => {
    const subcoursesSnapshot = await adminDb.collection("courses").doc(courseDoc.id).collection("subcourses").get();
    const subcourses = await Promise.all(subcoursesSnapshot.docs.map(async subcourseDoc => {
      const chaptersSnapshot = await adminDb.collection("courses")
        .doc(courseDoc.id)
        .collection("subcourses")
        .doc(subcourseDoc.id)
        .collection("chapters")
        .get();
      const chapters = chaptersSnapshot.docs.map(chapterDoc => ({
        id: chapterDoc.id,
        title: chapterDoc.data().title,
        chapterDescription: chapterDoc.data().chapterDescription
      }));
      return { id: subcourseDoc.id, title: subcourseDoc.data().title, chapters };
    }));
    return { id: courseDoc.id, title: courseDoc.data().title, subcourses };
  }));
}
