import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/products')
        ]);
        
        setProducts(productsResponse.data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(productsResponse.data.map(p => p.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (err) { 
        console.error(err); 
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
      <div className="spinner-border text-primary"></div>
      <p className="ms-3 mb-0 fw-bold">Loading NexaMart...</p>
    </div>
  );

  return (
    <div className="hmart-theme">
      {/* 1. Hero Banner */}
      <div className="hero-section mb-5 position-relative" style={{ 
        background: 'linear-gradient(135deg, #003366 0%, #00AEEF 100%)', 
        padding: '100px 0',
        color: 'white',
        overflow: 'hidden'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h5 className="text-white fw-bold text-uppercase mb-3">Welcome to NexaMart</h5>
              <h1 className="display-3 fw-bold mb-4">Everything You Need<br />In One Place</h1>
              <p className="lead mb-4">Discover amazing products across Electronics, Fashion, Sports & Home</p>
              <button className="btn btn-light btn-lg px-5 py-3 fw-bold rounded-0">
                SHOP NOW
              </button>
            </div>
            <div className="col-md-5">
              <div className="text-center">
                <i className="bi bi-cart-check" style={{fontSize: '150px', opacity: '0.3'}}></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* 2. Categories Section */}
        <div className="mb-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-navy">Shop by Category</h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: '#00AEEF', margin: '10px auto' }}></div>
          </div>
          
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            <button 
              className={`btn ${selectedCategory === 'All' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 py-2`}
              onClick={() => setSelectedCategory('All')}
            >
              All Products
            </button>
            {categories.map(category => (
              <button 
                key={category}
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 py-2`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Products Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold text-navy">
            {selectedCategory === 'All' ? 'All Products' : `${selectedCategory} Products`}
          </h2>
          <div style={{ width: '60px', height: '3px', backgroundColor: '#00AEEF', margin: '10px auto' }}></div>
          <p className="text-muted">{filteredProducts.length} products found</p>
        </div>

        {/* 4. Product Grid */}
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="text-center col-12 py-5">
              <i className="bi bi-search" style={{fontSize: '48px', color: '#ccc'}}></i>
              <p className="text-muted mt-3">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* 5. Feature Section */}
      <div className="bg-light py-5 mt-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-md-3">
              <div className="bg-white rounded-3 p-4 shadow-sm">
                <i className="bi bi-truck text-primary" style={{fontSize: '32px'}}></i>
                <h6 className="fw-bold mt-3">Fast Delivery</h6>
                <p className="small text-muted">Across Sri Lanka</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white rounded-3 p-4 shadow-sm">
                <i className="bi bi-shield-check text-primary" style={{fontSize: '32px'}}></i>
                <h6 className="fw-bold mt-3">Secure Payment</h6>
                <p className="small text-muted">100% Protected</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white rounded-3 p-4 shadow-sm">
                <i className="bi bi-headset text-primary" style={{fontSize: '32px'}}></i>
                <h6 className="fw-bold mt-3">24/7 Support</h6>
                <p className="small text-muted">Dedicated Assistance</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="bg-white rounded-3 p-4 shadow-sm">
                <i className="bi bi-arrow-repeat text-primary" style={{fontSize: '32px'}}></i>
                <h6 className="fw-bold mt-3">Easy Returns</h6>
                <p className="small text-muted">30 Day Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;