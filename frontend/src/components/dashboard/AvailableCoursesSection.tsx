import React from "react";
import SubCourseCard from "./SubCourseCard";

interface AvailableCoursesSectionProps {
  availableCourses: {
    id: string;
    title: string;
    subcourses: {
      id: string;
      title: string;
      chapters: { id: string; title: string; chapterDescription: string; }[];
    }[];
  }[];
  onEnroll: (chapterId: string) => void;
}

const AvailableCoursesSection: React.FC<AvailableCoursesSectionProps> = ({
  availableCourses,
  onEnroll,
}) => (
  <div className="container mt-4">
    <h3 className="heading-title">Browse Collections</h3>
    {availableCourses.map((course) => (
      <div key={course.id} className="mb-4 course-available-section" id={course.id}>
        <h2 className="course-title">{course.title}</h2>
        {course.subcourses.map((subcourse) => (
          <div key={subcourse.id} className="mb-4">
            <h3 className="subcourse-title">{subcourse.title}</h3>
            <div className="row">
              {subcourse.chapters.map((chapter) => (
                <div key={chapter.id} className="col-md-3 mb-3">
                  <SubCourseCard chapter={chapter} onEnroll={() => onEnroll(chapter.id)} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default AvailableCoursesSection;
