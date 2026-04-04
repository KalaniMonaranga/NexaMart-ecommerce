import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      // 🟢 Redirect Guest to Login
      alert("Please login to add products to your cart!");
      navigate('/login'); 
    } else {
      // Add your Cart Context logic here
      alert("Item added to cart!");
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then(({ data }) => {
      setProduct(data);
      setMainImage(data.images?.[0] || data.image);
    });
  }, [id]);

  if (!product) return <div className="text-center mt-5"><div className="spinner-border text-info"></div></div>;

  return (
    <div className="container mt-5 pt-4">
      <div className="row g-5">
        <div className="col-md-6 text-center">
          <img src={`http://localhost:5000${mainImage}`} className="img-fluid border p-3 bg-white" alt={product.name} style={{maxHeight: '500px', objectFit: 'contain'}} />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold" style={{color: '#003366'}}>{product.name}</h2>
          <h3 className="fw-bold my-3" style={{color: '#00AEEF'}}>Rs. {product.price.toLocaleString()}</h3>
          <p className="text-muted mb-4">{product.description}</p>
          
          <div className="d-flex align-items-center mb-4">
            <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, e.target.value))} className="form-control text-center me-3" style={{width: '70px'}} />
            <button onClick={handleAddToCart} className="btn btn-info text-white fw-bold px-5 py-2 flex-grow-1">ADD TO CART</button>
          </div>
          
          <div className="small border-top pt-3">
            <p className="mb-1"><strong>CATEGORY:</strong> {product.category}</p>
            <p className="mb-1"><strong>AVAILABILITY:</strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;