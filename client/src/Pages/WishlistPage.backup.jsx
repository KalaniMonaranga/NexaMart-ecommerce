import React from 'react';
import { Link } from 'react-router-dom';

const WishlistPage = ({ wishlistItems = [], removeFromWishlist, addToCart }) => {
  return (
    <div className="container my-5 hmart-theme">
      {/* 1. Header with Navy Accent */}
      <h2 className="mb-5 fw-bold text-navy border-bottom pb-3" style={{ color: '#003366' }}>
        My Wishlist <span className="text-muted small fw-normal">({wishlistItems.length} items)</span>
      </h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-5 shadow-sm bg-light border rounded-0">
          <i className="fa fa-heart-broken fa-4x text-muted mb-3 opacity-50"></i>
          <h4 className="fw-bold text-muted">Your wishlist is empty.</h4>
          <p className="mb-4">Save your favorite items here to buy them later!</p>
          <Link to="/shop" className="btn btn-sky px-5 py-2 fw-bold rounded-0 text-white" style={{ backgroundColor: '#00AEEF' }}>
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {wishlistItems.map(item => (
            <div className="col" key={item._id}>
              <div className="card h-100 shadow-sm border-0 rounded-0 hmart-card transition-hover">
                
                {/* 2. Image Handling with Backend URL */}
                <div className="position-relative" style={{ height: '200px' }}>
                  <img 
                    src={item.images?.[0] ? `http://localhost:5000${item.images[0]}` : `http://localhost:5000${item.image}`} 
                    className="card-img-top h-100 w-100" 
                    alt={item.name} 
                    style={{ objectFit: 'cover' }}
                    crossOrigin="anonymous"
                  />
                  {/* Remove Button Overlay */}
                  <button 
                    onClick={() => removeFromWishlist(item._id)}
                    className="position-absolute top-0 end-0 btn btn-danger rounded-0 shadow-sm m-2 p-1"
                    style={{ fontSize: '12px' }}
                    title="Remove from Wishlist"
                  >
                    <i className="fa fa-times px-1"></i>
                  </button>
                </div>

                <div className="card-body text-center">
                  <p className="text-muted small mb-1 text-uppercase">{item.category}</p>
                  <h6 className="card-title fw-bold text-truncate">{item.name}</h6>
                  <h5 className="fw-bold mb-3" style={{ color: '#003366' }}>
                    Rs. {item.price?.toLocaleString()}
                  </h5>
                  
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-sky fw-bold rounded-0 py-2 text-white"
                      style={{ backgroundColor: '#00AEEF', fontSize: '13px' }}
                      onClick={() => addToCart(item)}
                    >
                      <i className="fa fa-cart-plus me-2"></i>ADD TO CART
                    </button>
                    <Link 
                      to={`/product/${item._id}`} 
                      className="btn btn-outline-navy btn-sm rounded-0 fw-bold border-1"
                      style={{ color: '#003366', borderColor: '#003366', fontSize: '12px' }}
                    >
                      VIEW DETAILS
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;