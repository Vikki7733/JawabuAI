// src/components/CategoryRow.tsx
import React from 'react';
import '../styles/components/CategoryRow.css';

const categories = ['Arts', 'Mathematics', 'Computer Science', 'Science'];

const CategoryRow = () => {
  return (
<section className="category-row">
      {categories.map((category) => (
        <div key={category} className="category-icon">
          {category}
        </div>
      ))}
    </section>
  );
};

export default CategoryRow;
