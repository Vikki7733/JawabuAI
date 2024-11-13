import React from "react";
import SubCourseCard from "./SubCourseCard";
import { Chapter } from "../shared/Interfaces";

interface EnrolledCoursesSectionProps {
  enrolledCourses: Chapter[];
}

const EnrolledCoursesSection: React.FC<EnrolledCoursesSectionProps> = ({ enrolledCourses }) => (
  <div className="mt-4">
    <h3 className="heading-title">Continue your learning path!</h3>
    {enrolledCourses.length > 0 ? (
      <div className="row">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="col-md-3 mb-4">
            <SubCourseCard chapter={course} />
          </div>
        ))}
      </div>
    ) : (
      <p>No enrolled courses. Enroll in a course below!</p>
    )}
  </div>
);

export default EnrolledCoursesSection;
