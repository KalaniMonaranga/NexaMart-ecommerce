import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatCurrencyDisplay } from '../utils/currency.js';
import { useCart } from '../context/CartContext.jsx';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();

  // 1. Static Categories (Must match your Database values exactly)
  const categories = [
    "All", "Grocery and Hampers", "Fruits", 
    "Food and Restaurant", "Books and Stationery", "Home and Lifestyle",
    "Electronics", "Clothing and Fashion", "Sports and Outdoors", 
    "Beauty and Personal Care", "Toys and Games", "Automotive", "Health and Wellness"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setFilteredProducts(data); // Initial display: all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // 2. Filter Logic
  const handleFilter = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => p.category === cat);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="hmart-theme mb-5 pb-5"> 
      
      {/* 1. Page Banner */}
      <div className="page-banner mb-5 py-5" style={{ backgroundColor: '#f4f7f9' }}>
        <div className="container text-center py-4">
          <h1 className="fw-bold text-navy mb-2" style={{ color: '#003366' }}>Shop Our Collection</h1>
          <p className="text-muted small">HOME // <span className="text-sky fw-bold" style={{ color: '#00AEEF' }}>SHOP</span></p>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          
          {/* 2. Left Sidebar - Interactive Categories */}
          <div className="col-lg-3">
            <div className="card border-0 shadow-sm p-4 rounded-0 position-sticky" style={{ top: '100px' }}>
              <h5 className="fw-bold text-navy mb-4 border-bottom pb-2" style={{ borderBottom: '2px solid #00AEEF !important' }}>
                Top Categories
              </h5>
              <div className="category-list">
                {categories.map((cat) => {
                  const count = cat === 'All' ? products.length : products.filter(p => p.category === cat).length;
                  return (
                    <div 
                      key={cat}
                      className={`category-item py-2 px-3 mb-1 cursor-pointer transition-all d-flex justify-content-between align-items-center ${activeCategory === cat ? 'bg-navy text-white fw-bold' : 'text-muted'}`}
                      onClick={() => handleFilter(cat)}
                      style={{ 
                        cursor: 'pointer', 
                        backgroundColor: activeCategory === cat ? '#003366' : 'transparent',
                        color: activeCategory === cat ? 'white' : '#6c757d',
                        fontSize: '14px'
                      }}
                    >
                      <span>{cat}</span>
                      <span className={`badge rounded-pill ${activeCategory === cat ? 'bg-white text-navy' : 'bg-light text-muted'}`} style={{fontSize: '11px'}}>
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Right - Product Grid */}
          <div className="col-lg-9">
            {/* Sorting/Result Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 bg-light p-3 border">
              <span className="small text-muted">Showing {filteredProducts.length} results</span>
              <select className="form-select w-auto border-0 bg-transparent small fw-bold text-navy shadow-none">
                <option>Sort by: Newest Items</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

            <div className="row g-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <div className="col-md-4 col-sm-6" key={p._id}>
                    <div className="card hmart-card h-100 rounded-0 border-0 shadow-sm transition-hover">
                      <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
                        <Link to={`/product/${p._id}`}>
                          <img 
                            src={p.images?.[0]?.startsWith('http') ? p.images[0] : `http://localhost:5000${p.images?.[0] || p.image}`} 
                            className="card-img-top rounded-0 w-100 h-100" 
                            alt={p.name} 
                            style={{ objectFit: 'cover' }}
                            onError={(e) => {e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300'}}
                          />
                        </Link>
                      </div>
                      <div className="card-body text-center d-flex flex-column justify-content-between">
                        <div>
                          <p className="text-muted small mb-1 text-uppercase" style={{ fontSize: '11px' }}>{p.category}</p>
                          <h6 className="fw-bold text-dark mb-2">{p.name}</h6>
                          <p className="fw-bold mb-3" style={{ color: '#003366' }}>
                            {formatCurrencyDisplay(p.price)}
                          </p>
                        </div>
                        <button 
                          onClick={() => addToCart(p)}
                          className="btn btn-sky w-100 fw-bold rounded-0 py-2 border-0" 
                          style={{ backgroundColor: '#00AEEF', color: 'white', fontSize: '13px' }}
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <i className="fa fa-box-open fa-3x text-light mb-3"></i>
                  <h4 className="text-muted">No products found in this category.</h4>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Shop;