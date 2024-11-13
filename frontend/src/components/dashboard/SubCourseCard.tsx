import React from "react";
import { Chapter } from "../shared/Interfaces";
import "../../styles/components/SubCourseCard.css";
import mathLogo from "../../assets/courses-logo.webp";

interface SubCourseCardProps {
  chapter: Chapter;
  onEnroll?: (chapterId: string) => void;
}

const SubCourseCard: React.FC<SubCourseCardProps> = ({ chapter, onEnroll }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{chapter.title}</h5>
        <img src={mathLogo} alt={chapter.title} className="card-img" />
        <p className="card-text">{chapter.chapterDescription}</p>
        {onEnroll && (
          <button
            className="btn btn-outline-dark enroll-btn"
            onClick={() => onEnroll(chapter.id)}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
};

export default SubCourseCard;
