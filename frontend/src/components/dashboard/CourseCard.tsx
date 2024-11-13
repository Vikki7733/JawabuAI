import React from "react";
import { Course } from "../shared/Interfaces";
import SubCourseCard from "./SubCourseCard";
import "../../styles/components/CourseCard.css";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <section className="mb-5 course-card">
      <div className="card-container">
        <h4 className="card-title">
          <b>{course.title}</b>
        </h4>
      </div>
      
      {course.subcourses.map((subcourse) => (
        <div key={subcourse.id} className="mb-4">
          <div className="row">
            {subcourse.chapters.map((chapter) => (
              <div key={chapter.id} className="col-md-3 mb-3">
                <SubCourseCard chapter={chapter} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default CourseCard;
