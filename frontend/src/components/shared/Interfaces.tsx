// interfaces.ts
  
  export interface User {
    email: string;
    id: string
    firstName?: string;
    currentCourse?: Course;
    lastName?: string;
    age?: string;
    phone?: string;
    address?: string;
  }

  export interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
    enrolledChapters: Chapter[]; // Define enrolledCourses as array of Course
    availableCourses: Course[];
  }
  export interface CoursesState {
    courses: Course[];
    chapters: Chapter[];
    enrolledChapters: Chapter[];
    loading: boolean;
    error: string | null;
    responseMessages: string[];
  }
  

  export interface EnrolledChapter {
    updatedAt: any;
    enrolledAt: any;
    chapterDescription: string;
    chapterId: string;
    chapterTitle: string;
    subcourseId: string;
    subcourseTitle: string;
    courseId: string;
    courseTitle: string;
    progress?: number;
  }
  
  export interface Chapter {
    id: string;
    title: string;
    chapterDescription: string;
  }
  
  export interface Subcourse {
    id: string;
    title: string;
    chapters: Chapter[];
  }
  
  export interface Course {
    id: string;
    title: string;
    subcourses: Subcourse[];
  }