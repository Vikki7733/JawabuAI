import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import { Course, CoursesState, EnrolledChapter } from "../../components/shared/Interfaces";

// Async thunk to enroll the user in courses
export const enrollUserInChapters = createAsyncThunk("courses/enrollUserInCourses", async (credentials: any) => {
  const response = await api.post("/auth/enroll", credentials);
  return response.data; // Return the response directly
});

// Async thunk to update user progress
export const updateUserProgress = createAsyncThunk(
  "courses/updateUserProgress",
  async ({ userId, courses }: { userId: string; courses: Course[] }) => {
    const response = await fetch(`/auth/progress`, {
      method: "POST",
      body: JSON.stringify({ userId, courses }),
      headers: { "Content-Type": "application/json" },
    });
    return response.json();
  }
);

// Async thunk to fetch courses
export const fetchCourses = createAsyncThunk<Course[]>("/courses/fetchCourses", async () => {
  const response = await api.get("/auth/courses");
  console.log("Courses Data:", response);
  const data = await response.data();
  return data;
});

const initialState: CoursesState = {
  courses: [],
  chapters: [],
  loading: false,
  error: null as string | null,
  enrolledChapters: [],
  responseMessages: [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    updateEnrolledCourses: (state, action) => {
      state.enrolledChapters = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.courses = action.payload;
      })
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(enrollUserInChapters.fulfilled, (state, action) => {
        const { enrolledChapters, responseMessages  }: { enrolledChapters: EnrolledChapter[], responseMessages: string[], } = action.payload;

        enrolledChapters.forEach((chapter) => {
          const existingCourse = state.courses.find(
            (course) => course.id === chapter.courseId
          );

          if (existingCourse) {
            // Find the subcourse by subcourseId
            const existingSubcourse = existingCourse.subcourses.find(
              (subcourse) => subcourse.id === chapter.subcourseId
            );

            if (existingSubcourse) {
              // Map EnrolledChapter to Chapter and push it into the existing subcourse's chapters array
              existingSubcourse.chapters.push({
                id: chapter.chapterId,
                title: chapter.chapterTitle,
                chapterDescription: '',
              });
            }
          }
          state.responseMessages = responseMessages;
        });
      })
      .addCase(enrollUserInChapters.pending, (state) => {
        state.loading = true;
      })
      .addCase(enrollUserInChapters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
    /*
    1. Add the logic to update the state of user progress of the chapters.
    */

  },
});

export const { updateEnrolledCourses } = coursesSlice.actions;

export default coursesSlice.reducer;
