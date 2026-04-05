import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../components/StarRating.jsx';

const ProductCard = ({ product }) => {
  // 1. Handle the image source carefully (Array vs String)
  // If images is an array, take the first one. Fallback to a placeholder if empty.
  const imageUrl = product.images && product.images.length > 0 
    ? `http://localhost:5000${product.images[0]}` 
    : (product.image ? `http://localhost:5000${product.image}` : 'https://via.placeholder.com/300');

  return (
    <div className="card h-100 shadow-sm border-0 rounded-0 hmart-card transition-hover">
      {/* Product Image Wrapper */}
      <div className="position-relative overflow-hidden bg-light" style={{ height: '220px' }}>
        <Link to={`/product/${product._id}`}>
          <img 
            src={imageUrl} 
            className="card-img-top w-100 h-100" 
            alt={product.name} 
            style={{ objectFit: 'cover', transition: '0.3s' }}
            crossOrigin="anonymous"
          />
        </Link>
        {/* Optional: Add a "New" badge if the product is recently added */}
        {product.countInStock <= 0 && (
          <div className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1 small fw-bold">
            OUT OF STOCK
          </div>
        )}
      </div>

      <div className="card-body text-center d-flex flex-column justify-content-between">
        <div>
          <p className="text-muted small mb-1 text-uppercase">{product.category}</p>
          <h6 className="fw-bold text-truncate mb-2" title={product.name} style={{ color: '#333' }}>
            {product.name}
          </h6>
          {/* Star Rating */}
          <div className="mb-2 d-flex justify-content-center">
            <StarRating 
              rating={product.rating || 0} 
              numReviews={product.numReviews || 0} 
              size="sm"
            />
          </div>
          <h5 className="fw-bold mb-3" style={{ color: '#003366' }}>
            Rs. {product.price?.toLocaleString()}
          </h5>
        </div>

        <Link 
          to={`/product/${product._id}`} 
          className="btn btn-sm w-100 fw-bold rounded-0 py-2"
          style={{ 
            backgroundColor: '#00AEEF', 
            color: 'white', 
            border: 'none',
            fontSize: '13px'
          }}
        >
          VIEW DETAILS
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;