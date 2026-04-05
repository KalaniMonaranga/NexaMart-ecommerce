import React from 'react';

const StarRating = ({ rating, numReviews, showCount = true, size = 'md' }) => {
  const sizeClasses = {
    sm: 'fs-6',
    md: 'fs-5',
    lg: 'fs-4'
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <i key={i} className={`bi bi-star-fill text-warning ${sizeClasses[size]}`}></i>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <i key={i} className={`bi bi-star-half text-warning ${sizeClasses[size]}`}></i>
        );
      } else {
        stars.push(
          <i key={i} className={`bi bi-star text-warning ${sizeClasses[size]}`}></i>
        );
      }
    }
    return stars;
  };

  return (
    <div className="d-flex align-items-center">
      <div className="me-2">{renderStars()}</div>
      {showCount && numReviews > 0 && (
        <small className="text-muted">({numReviews} reviews)</small>
      )}
    </div>
  );
};

export default StarRating;
