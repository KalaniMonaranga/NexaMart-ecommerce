import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const RatingForm = ({ productId, onReviewAdded }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      setError('Please write a review comment');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ rating, comment })
      });

      if (response.ok) {
        setSuccess('Review added successfully!');
        setRating(0);
        setComment('');
        onReviewAdded && onReviewAdded();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add review');
      }
    } catch (err) {
      setError('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="alert alert-info">
        <i className="bi bi-info-circle me-2"></i>
        Please <a href="/login">login</a> to write a review.
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-header bg-white py-3">
        <h5 className="fw-bold mb-0" style={{ color: '#003366' }}>
          <i className="bi bi-pencil-square me-2"></i>Write a Review
        </h5>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger alert-dismissible fade show">
            <i className="bi bi-exclamation-triangle me-2"></i>{error}
            <button type="button" className="btn-close" onClick={() => setError('')}></button>
          </div>
        )}
        
        {success && (
          <div className="alert alert-success alert-dismissible fade show">
            <i className="bi bi-check-circle me-2"></i>{success}
            <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Star Rating */}
          <div className="mb-3">
            <label className="form-label fw-bold">Your Rating</label>
            <div className="d-flex align-items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="btn btn-link p-1"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  style={{ textDecoration: 'none' }}
                >
                  <i
                    className={`bi bi-star${
                      star <= (hoverRating || rating) ? '-fill' : ''
                    } text-warning fs-4`}
                  ></i>
                </button>
              ))}
              <span className="ms-2 text-muted">
                {rating > 0 && `${rating} out of 5 stars`}
              </span>
            </div>
          </div>

          {/* Comment */}
          <div className="mb-3">
            <label className="form-label fw-bold">Your Review</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Share your experience with this product..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
            ></textarea>
            <small className="text-muted">{comment.length}/500 characters</small>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Submitting...
              </>
            ) : (
              <>
                <i className="bi bi-send me-2"></i>Submit Review
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RatingForm;
