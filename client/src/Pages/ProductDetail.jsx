import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from '../context/CartContext.jsx';
import { formatCurrencyDisplay } from '../utils/currency.js';
import StarRating from '../components/StarRating.jsx';
import RatingForm from '../components/RatingForm.jsx';
import ReviewsList from '../components/ReviewsList.jsx';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [weight, setWeight] = useState(1); 
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  // Simple wishlist functionality
  const handleAddToWishlist = () => {
    if (product) {
      let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      if (!wishlist.find(item => item._id === product._id)) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        alert(`${product.name} added to wishlist!`);
      } else {
        alert(`${product.name} is already in your wishlist!`);
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        // Fetch reviews
        const reviewsRes = await fetch(`http://localhost:5000/api/products/${id}/reviews`);
        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const currentPrice = product ? (product.price * weight) * quantity : 0;

  // 🟢 4. Function to handle Add to Cart click
  const handleAddToCart = () => {
    if (product) {
      addToCart({ 
        ...product, 
        quantity, 
        selectedWeight: weight,
        priceAtPurchase: currentPrice / quantity // Stores unit price for cart logic
      });
      // Optional: Add a toast notification or alert
      alert(`${product.name} added to cart!`);
    }
  };

  if (loading) return (
    <div className="text-center mt-5 py-5">
      <div className="spinner-border text-primary"></div>
      <p className="mt-2 text-muted">Loading product details...</p>
    </div>
  );

  if (!product) return <div className="container text-center py-5"><h3>Product not found.</h3></div>;

  return (
    <div className="hmart-theme container my-5">
      <div className="row g-5">
        <div className="col-md-6">
          <div className="product-image-container p-3 border bg-light">
            <img 
              src={(() => {
                const img = product.images?.[0] || product.image;
                if (!img) return 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400';
                return img.startsWith('http') ? img : `http://localhost:5000${img}`;
              })()} 
              className="img-fluid w-100" 
              alt={product.name} 
              style={{ maxHeight: '500px', objectFit: 'contain' }}
              onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'}}
            />
          </div>
        </div>
        
        <div className="col-md-6">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb small text-uppercase">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
              <li className="breadcrumb-item active text-sky fw-bold" style={{color: '#00AEEF'}}>{product.category}</li>
            </ol>
          </nav>

          <h1 className="fw-bold text-navy mb-2" style={{color: '#003366'}}>{product.name}</h1>
          
          {/* Rating Display */}
          <div className="mb-3">
            <StarRating 
              rating={product.rating || 0} 
              numReviews={product.numReviews || 0} 
              size="md"
            />
          </div>
          
          <div className="d-flex align-items-center mb-3">
             <h2 className="fw-bold mb-0" style={{color: '#003366'}}>{formatCurrencyDisplay(currentPrice)}</h2>
             {product.countInStock > 0 ? (
               <span className="ms-3 badge bg-success-subtle text-success border border-success border-opacity-25 rounded-0">IN STOCK</span>
             ) : (
               <span className="ms-3 badge bg-danger-subtle text-danger border border-danger border-opacity-25 rounded-0">OUT OF STOCK</span>
             )}
          </div>

          <p className="text-muted mb-4" style={{ lineHeight: '1.8' }}>{product.description}</p>
          
          <hr />

          <div className="mb-4">
            <label className="form-label fw-bold small text-navy text-uppercase">Select Weight:</label>
            <select 
              className="form-select rounded-0 w-50" 
              value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))}
            >
              <option value="0.5">500g</option>
              <option value="1">1kg (Standard)</option>
              <option value="2">2kg</option>
              <option value="5">5kg</option>
            </select>
          </div>

          <div className="row g-2 mb-4">
            <div className="col-3">
              <label className="form-label fw-bold small text-navy text-uppercase">Qty:</label>
              <input 
                type="number" 
                className="form-control rounded-0 text-center" 
                value={quantity} 
                onChange={(e) => setQuantity(Number(e.target.value))} 
                min="1" 
                max={product.countInStock}
              />
            </div>
            
            <div className="col-7 align-self-end">
              <button 
                className="btn btn-lg w-100 rounded-0 fw-bold py-2 shadow-sm text-white"
                style={{ backgroundColor: '#003366' }}
                disabled={product.countInStock <= 0}
                onClick={handleAddToCart} // 🟢 5. Connected to the function
              >
                <i className="fa fa-shopping-cart me-2"></i>ADD TO CART
              </button>
            </div>
            
            <div className="col-2 align-self-end">
              <button 
                className="btn btn-outline-secondary btn-lg w-100 rounded-0"
                onClick={handleAddToWishlist}
              >
                <i className="fa fa-heart"></i>
              </button>
            </div>
          </div>
          
          <div className="p-3 border rounded-0 bg-light">
            <div className="d-flex align-items-center mb-2">
               <i className="fa fa-truck me-3 text-sky" style={{color: '#00AEEF'}}></i>
               <small className="fw-bold text-navy">Island-wide Delivery Available</small>
            </div>
            <div className="d-flex align-items-center">
               <i className="fa fa-check-circle me-3 text-sky" style={{color: '#00AEEF'}}></i>
               <small className="fw-bold text-navy">100% Organic & Fresh Guaranteed</small>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-5">
        <ul className="nav nav-tabs rounded-0 border-bottom-0">
          <li className="nav-item">
            <span className="nav-link active rounded-0 fw-bold border-top border-4" style={{borderColor: '#003366'}}>DESCRIPTION</span>
          </li>
        </ul>
        <div className="p-4 border">
          <p className="mb-0 text-muted">{product.information || "Detailed product specifications and instructions will appear here."}</p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-5 pt-3">
        <h3 className="fw-bold mb-4" style={{ color: '#003366' }}>
          <i className="bi bi-star-fill me-2 text-warning"></i>Customer Reviews
        </h3>
        <div className="row">
          <div className="col-md-4">
            <RatingForm 
              productId={id} 
              onReviewAdded={() => {
                // Refresh reviews after adding
                fetch(`http://localhost:5000/api/products/${id}/reviews`)
                  .then(res => res.json())
                  .then(data => setReviews(data));
              }}
            />
          </div>
          <div className="col-md-8">
            <ReviewsList reviews={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;