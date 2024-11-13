import React from "react";

interface StickyHeaderProps {
  availableCourses: { id: string; title: string }[];
  activeCourse: string | null;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({ availableCourses, activeCourse }) => (
  <div className="sticky-header">
    <ul>
      {availableCourses.map((course) => (
        <li
          key={course.id}
          className={activeCourse === course.id ? "active" : ""}
          onClick={() => {
            const element = document.getElementById(course.id);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          {course.title}
        </li>
      ))}
    </ul>
  </div>
);

export default StickyHeader;
