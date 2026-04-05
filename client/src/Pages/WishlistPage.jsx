import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrencyDisplay } from '../utils/currency.js';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, moveToCart } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    moveToCart(product, addToCart);
  };

  const getImageUrl = (item) => {
    if (item.images && item.images.length > 0) {
      return item.images[0];
    }
    return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400';
  };

  return (
    <div className="container py-5" style={{ minHeight: '80vh', marginTop: '60px' }}>
      <div className="card shadow-sm border-0 rounded-0 bg-white">
        <div className="p-4">
          <h2 className="fw-bold mb-4" style={{ color: '#003366' }}>
            <i className="bi bi-heart me-2"></i>My Wishlist
            <span className="badge bg-info ms-2">{wishlistItems.length}</span>
          </h2>
          <hr />
          
          {wishlistItems.length === 0 ? (
            <div className="py-5 text-center">
              <i className="bi bi-heart display-1 text-muted"></i>
              <h4 className="mt-3 text-secondary">Your wishlist is empty</h4>
              <p className="text-muted">Save your favorite items here to buy them later!</p>
              <Link to="/" className="btn btn-lg btn-primary mt-3 px-5 rounded-0 fw-bold">
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="row">
              {wishlistItems.map((item) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item._id}>
                  <div className="card h-100 shadow-sm border-0">
                    <div className="position-relative">
                      <img 
                        src={getImageUrl(item)} 
                        className="card-img-top" 
                        alt={item.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      
                      {/* Remove from Wishlist Button */}
                      <button 
                        className="position-absolute top-0 end-0 m-2 btn btn-sm btn-danger rounded-circle"
                        onClick={() => removeFromWishlist(item._id)}
                        style={{ width: '35px', height: '35px', padding: '0' }}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                      
                      {/* Category Badge */}
                      <span className="position-absolute top-0 start-0 m-2 badge bg-primary">
                        {item.category}
                      </span>
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold text-truncate" title={item.name}>
                        {item.name}
                      </h5>
                      
                      <p className="card-text text-muted small" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {item.description}
                      </p>
                      
                      <div className="text-muted small mb-2">
                        <i className="bi bi-info-circle me-1"></i>
                        {item.information}
                      </div>
                      
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <span className="fw-bold fs-5 text-primary">{formatCurrencyDisplay(item.price)}</span>
                          {item.countInStock > 0 ? (
                            <span className="badge bg-success">In Stock</span>
                          ) : (
                            <span className="badge bg-danger">Out of Stock</span>
                          )}
                        </div>
                        
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-primary flex-fill rounded-0"
                            onClick={() => handleMoveToCart(item)}
                            disabled={item.countInStock === 0}
                          >
                            <i className="bi bi-cart-plus me-1"></i>
                            Add to Cart
                          </button>
                          
                          <Link 
                            to={`/product/${item._id}`}
                            className="btn btn-outline-secondary rounded-0"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
