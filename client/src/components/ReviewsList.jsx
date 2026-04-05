import React from 'react';
import StarRating from './StarRating';

const ReviewsList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-4">
        <i className="bi bi-chat-square-text display-4 text-muted"></i>
        <p className="text-muted mt-2">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="reviews-list">
      <h5 className="fw-bold mb-3" style={{ color: '#003366' }}>
        <i className="bi bi-chat-left-quote me-2"></i>Customer Reviews ({reviews.length})
      </h5>
      
      {reviews.map((review, index) => (
        <div key={index} className="card border-0 shadow-sm mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="d-flex align-items-center">
                <div 
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                  style={{ width: '40px', height: '40px' }}
                >
                  <span className="fw-bold">
                    {review.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h6 className="fw-bold mb-0">{review.name}</h6>
                  <small className="text-muted">
                    <i className="bi bi-calendar3 me-1"></i>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </div>
              <StarRating rating={review.rating} numReviews={0} showCount={false} size="sm" />
            </div>
            <p className="mb-0 mt-2">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
