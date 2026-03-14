import React from 'react';

// For now, we simulate 'user'. Later, this will come from your Auth Context/State
const ProductCard = ({ product, user }) => { 
  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={product.imageUrl} 
        className="card-img-top p-2" 
        alt={product.name} 
        style={{ height: '200px', objectFit: 'contain' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted small">{product.description}</p>
        
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-5">${product.price}</span>
          <button className="btn btn-primary btn-sm">Add to Cart</button>
        </div>

        {/* --- ADMIN ACTIONS START --- */}
        {user && user.role === 'admin' && (
          <div className="admin-actions mt-3 pt-3 border-top d-flex gap-2">
            <button className="btn btn-outline-warning btn-sm w-50">Edit</button>
            <button className="btn btn-outline-danger btn-sm w-50">Delete</button>
          </div>
        )}
        {/* --- ADMIN ACTIONS END --- */}
        
      </div>
    </div>
  );
};

export default ProductCard;