import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const scrollRef = useRef(null);

  const scrollHorizontally = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // width of card + gap
      scrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

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

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

      {/* 1.6. Search Bar Section */}
      <div className="container" style={{ marginTop: '-40px' }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg p-4 rounded-4" style={{ backgroundColor: 'white' }}>
              <div className="row g-2 align-items-center">
                <div className="col-md-9 position-relative">
                  <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted fs-5"></i>
                  <input 
                    type="text" 
                    className="form-control form-control-lg ps-5 rounded-pill border-light-subtle shadow-none" 
                    placeholder="Search for electronics, fashion, groceries..." 
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                    style={{ fontSize: '1rem', padding: '15px 50px' }}
                  />
                  {searchTerm && (
                    <button 
                      className="btn btn-link position-absolute top-50 end-0 translate-middle-y me-3 text-muted p-0"
                      onClick={() => setSearchTerm('')}
                    >
                      <i className="bi bi-x-circle-fill"></i>
                    </button>
                  )}
                </div>
                <div className="col-md-3">
                  <button className="btn btn-primary btn-lg w-100 rounded-pill fw-bold shadow-sm py-3" style={{ backgroundColor: '#00AEEF', borderColor: '#00AEEF' }}>
                    SEARCH
                  </button>
                </div>
              </div>
              <div className="mt-3 d-flex flex-wrap gap-2 justify-content-center">
                <small className="text-muted fw-bold me-2">Trending:</small>
                {['Smartphones', 'Groceries', 'Hampers', 'Watches'].map(tag => (
                   <span 
                    key={tag} 
                    className="badge bg-light text-navy fw-normal px-3 py-2 cursor-pointer border hover-shadow"
                    style={{ cursor: 'pointer', color: '#003366' }}
                    onClick={() => setSearchTerm(tag)}
                   >
                    {tag}
                   </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">

        {/* 1.5. Featured Products Carousel (User Friendly Horizontal Scroll) */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold text-navy mb-0">Trending Now</h3>
            <div className="d-flex gap-2">
              <button 
                onClick={() => scrollHorizontally('left')}
                className="btn btn-outline-primary rounded-circle shadow-sm" 
                style={{ width: '40px', height: '40px' }}
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button 
                onClick={() => scrollHorizontally('right')}
                className="btn btn-outline-primary rounded-circle shadow-sm" 
                style={{ width: '40px', height: '40px' }}
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
          
          <div 
            ref={scrollRef}
            className="d-flex overflow-auto pb-4 custom-scrollbar" 
            style={{ gap: '1.5rem', scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}
          >
            {products.slice(0, 8).map(product => (
              <div 
                key={product._id} 
                className="flex-shrink-0"
                style={{ width: '280px', scrollSnapAlign: 'start' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* 2. Categories Section */}
        <div className="mb-5 mt-5">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-navy">Shop by Category</h2>
            <div style={{ width: '60px', height: '3px', backgroundColor: '#00AEEF', margin: '10px auto' }}></div>
          </div>
          
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
            <button 
              className={`btn ${selectedCategory === 'All' ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 py-2`}
              onClick={() => { setSelectedCategory('All'); setPage(1); }}
            >
              All Products
            </button>
            {categories.map(category => (
              <button 
                key={category}
                className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'} rounded-pill px-4 py-2`}
                onClick={() => { setSelectedCategory(category); setPage(1); }}
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

        {/* 4. Product Grid (4x3 Layout = 12 Items per page) */}
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.slice((page - 1) * 20, page * 20).map(product => (
              <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <div className="text-center w-100 py-5">
              <i className="bi bi-search" style={{fontSize: '48px', color: '#ccc'}}></i>
              <p className="text-muted mt-3">No products found in this category.</p>
            </div>
          )}
        </div>

        {/* 5. Pagination & View Full Shop Button */}
        {filteredProducts.length > 0 && (
          <div className="d-flex justify-content-center align-items-center gap-3 mb-5 mt-4">
            <button 
              className="btn btn-outline-primary rounded-circle shadow-sm d-flex justify-content-center align-items-center" 
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              style={{ width: '50px', height: '50px', visibility: filteredProducts.length > 20 ? 'visible' : 'hidden' }}
            >
              <i className="bi bi-chevron-left fs-5"></i>
            </button>
            
            <a href="/shop" className="btn btn-primary btn-lg px-5 rounded-pill shadow-sm">
              Explore All {filteredProducts.length} Products
            </a>
            
            <button 
              className="btn btn-outline-primary rounded-circle shadow-sm d-flex justify-content-center align-items-center" 
              onClick={() => setPage(page + 1)}
              disabled={page * 20 >= filteredProducts.length}
              style={{ width: '50px', height: '50px', visibility: filteredProducts.length > 20 ? 'visible' : 'hidden' }}
            >
              <i className="bi bi-chevron-right fs-5"></i>
            </button>
          </div>
        )}
      </div>
      
      {/* 6. Feature Section */}
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