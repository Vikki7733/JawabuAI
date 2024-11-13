import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Header from "../components/Header";
import WelcomeCard from "../components/dashboard/WelcomeCard";
import EnrolledCoursesSection from "../components/dashboard/EnrolledCoursesSection";
import AvailableCoursesSection from "../components/dashboard/AvailableCoursesSection";
import StickyHeader from "../components/dashboard/StickyHeader";
import { enrollUserInChapters, updateEnrolledCourses } from "../redux/slices/courseSlice";
import "../styles/components/Dashboard.css";
import { fetchUserData } from "../redux/slices/authSlice";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const enrolledCourses = useSelector((state: RootState) => state.auth.enrolledChapters);
  const availableCourses = useSelector((state: RootState) => state.auth.availableCourses);
  const enrollmentMessages = useSelector((state: RootState) => state.courses.responseMessages);

  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
 // Ensure this runs only once when component mounts
  
 useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  const handleEnrollChapter = async (userId: string, chapterId: string) => {
    try {
      const action = await dispatch(enrollUserInChapters({ userId, chapterIds: [chapterId] }));
      if (enrollUserInChapters.fulfilled.match(action)) {
        const enrolledChapters = action.payload.enrolledChapters;
        dispatch(updateEnrolledCourses(enrolledChapters));
        const enrollmentMessages = action.payload.responseMessages && action.payload.responseMessages.length > 0
        ? action.payload.responseMessages[0] 
        : "Enrollment successful!";
      setMessage(enrollmentMessages);
      window.alert(enrollmentMessages);
      await dispatch(fetchUserData());
      } else {
        throw new Error("Enrollment failed");
      }
    } catch {
      const errorMsg = "Error during enrollment.";
      setMessage(errorMsg);
      console.error(errorMsg);
      window.alert(errorMsg);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentCourse = availableCourses.find((course) => {
        const courseElement = document.getElementById(course.id);
        const rect = courseElement?.getBoundingClientRect();
        return rect && rect.top < window.innerHeight && rect.bottom >= 0;
      });
      setActiveCourse(currentCourse ? currentCourse.id : null);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [availableCourses]);

  return (
    <div>
      <Header onLoginClick={() => {}} />
      <div className="container mt-4">
        <WelcomeCard user={{ ...user, firstName: user?.firstName ?? "Guest" }} />
        <EnrolledCoursesSection enrolledCourses={enrolledCourses} />
      </div>
      <StickyHeader availableCourses={availableCourses} activeCourse={activeCourse} />
      <AvailableCoursesSection
        availableCourses={availableCourses}
        onEnroll={(chapterId) => handleEnrollChapter(user?.id ?? "", chapterId)}
      />
    </div>
  );
};

export default Dashboard;
