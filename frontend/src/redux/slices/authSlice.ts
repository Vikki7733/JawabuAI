import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { AuthState, Course } from "../../components/shared/Interfaces";

// Async Thunk for registering user
export const registerUser = createAsyncThunk("auth/register", async (userData: any, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/register", userData);
    localStorage.setItem("token", response.data.token);
    return response.data;

  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue({ error: "An unexpected error occurred." });
    }
  }
});

// Async Thunk to login user
export const loginUser = createAsyncThunk("auth/login", async (credentials: any, { rejectWithValue }) => {
  try {
    const response = await api.post("/auth/loginUser", credentials);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue({ error: "An unexpected error occurred." });
    }
  }
});

// Async Thunk to logout the user
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("token");
  return null;
});

// Async Thunk to Google Login
export const googleLoginUser = createAsyncThunk("auth/googleLogin", async (idToken: string) => {
  const response = await api.post("/auth/googleLogin", { idToken });
  localStorage.setItem("token", response.data.token);
  return response.data;
});

// Async Thunk to fetch userData
export const fetchUserData = createAsyncThunk("auth/fetchUserData", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }
  const response = await api.get("/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null as string | null,
  enrolledChapters: [],
  availableCourses: []
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateEnrolledCourses: (state, action) => {
      state.enrolledChapters = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.enrolledChapters = action.payload.enrolledCourses?.map((enrolledCourse: any) => {
          const courseDetails = action.payload.availableCourses?.find(
            (course: Course) => course.id === enrolledCourse.id
          );
          return {
            ...courseDetails,
            progress: enrolledCourse.progress,
            enrolledAt: enrolledCourse.enrolledAt,
            updatedAt: enrolledCourse.updatedAt,
          };
        }) || [];
        state.availableCourses = action.payload.availableCourses ?? [];
        state.error = null;
      })
      .addCase(googleLoginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = null;
        console.log("State after user data fetch:", state);
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.enrolledChapters = action.payload.enrolledChapters ?? [];
        state.availableCourses = action.payload.availableCourses ?? [];
      })
      
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(googleLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { updateEnrolledCourses } = authSlice.actions;
export default authSlice.reducer;
