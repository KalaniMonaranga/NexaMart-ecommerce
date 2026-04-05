import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatCurrencyDisplay } from '../utils/currency.js';

const ProductCard = ({ product }) => { 
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    try {
      await addToCart(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToWishlist(product);
  };

  const getImageUrl = () => {
    if (imageError) {
      return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400';
    }
    if (product.images && product.images.length > 0) {
      const img = product.images[0];
      return img.startsWith('http') ? img : `http://localhost:5000${img}`;
    }
    if (product.image) {
      return product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`;
    }
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400';
  };

  const inWishlist = isInWishlist(product._id);

  return (
    <Link to={`/product/${product._id}`} className="text-decoration-none">
      <div className="card h-100 shadow-sm border-0 product-card">
        {/* Product Image */}
        <div className="position-relative overflow-hidden">
          <img 
            src={getImageUrl()} 
            className="card-img-top" 
            alt={product.name} 
            style={{ 
              height: '250px', 
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            onError={() => setImageError(true)}
          />
          
          {/* Category Badge */}
          <span className="position-absolute top-0 start-0 m-2 badge bg-primary">
            {product.category}
          </span>
          
          {/* Wishlist Button */}
          <button 
            className={`position-absolute top-0 end-0 m-2 btn btn-sm ${inWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
            onClick={handleWishlistToggle}
            style={{ borderRadius: '50%', width: '35px', height: '35px', padding: '0' }}
          >
            <i className={`bi ${inWishlist ? 'bi-heart-fill' : 'bi-heart'}`}></i>
          </button>
          
          {/* Stock Badge */}
          {product.countInStock <= 5 && (
            <span className="position-absolute bottom-0 start-0 m-2 badge bg-danger">
              Only {product.countInStock} left
            </span>
          )}
        </div>

        <div className="card-body d-flex flex-column">
          {/* Product Name */}
          <h5 className="card-title fw-bold text-truncate" title={product.name}>
            {product.name}
          </h5>
          
          {/* Product Description */}
          <p className="card-text text-muted small" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.description}
          </p>
          
          {/* Product Info */}
          <div className="text-muted small mb-2">
            <i className="bi bi-info-circle me-1"></i>
            {product.information}
          </div>
          
          {/* Price and Add to Cart */}
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span className="fw-bold fs-4 text-primary">{formatCurrencyDisplay(product.price)}</span>
                {product.countInStock > 0 && (
                  <div className="text-success small">
                    <i className="bi bi-check-circle me-1"></i>In Stock
                  </div>
                )}
              </div>
            </div>
            
            <button 
              className={`btn btn-primary w-100 py-2 rounded-0 ${isAdding ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={isAdding || product.countInStock === 0}
            >
              {isAdding ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Adding...
                </>
              ) : product.countInStock === 0 ? (
                <>
                  <i className="bi bi-x-circle me-2"></i>
                  Out of Stock
                </>
              ) : (
                <>
                  <i className="bi bi-cart-plus me-2"></i>
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hover Effects */}
        <style jsx>{`
          .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
          }
          .product-card:hover .card-img-top {
            transform: scale(1.05);
          }
        `}</style>
      </div>
    </Link>
  );
};

export default ProductCard;