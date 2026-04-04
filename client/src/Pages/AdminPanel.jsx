import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  // Form State - 🟢 'information' has been removed
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Grocery and Hampers');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState(null); 
  const [description, setDescription] = useState('');

  const categories = [
    "Grocery and Hampers", "Fruits", "Food and Restaurant", 
    "Books and Stationery", "Home and Lifestyle"
  ];

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(num).replace("LKR", "Rs.");
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products", err);
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const config = {
          headers: { Authorization: `Bearer ${userInfo?.token}` },
        };
        await axios.delete(`http://localhost:5000/api/products/${id}`, config);
        fetchProducts(); 
        alert("✅ Product deleted successfully!");
      } catch (err) {
        alert(`❌ Error: ${err.response?.data?.message || "Delete failed"}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    // 🟢 Information append removed here
    formData.append('countInStock', stock);
    formData.append('category', category);

    if (images && images.length > 0) {
      formData.append('image', images[0]); 
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { 
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo?.token}`
        } 
      };
      
      await axios.post('http://localhost:5000/api/products', formData, config);
      alert('✅ Product added successfully!');
      
      // Clear form
      setName(''); setPrice(''); setStock(''); setDescription('');
      setImages(null);
      e.target.reset(); 
      fetchProducts(); 
    } catch (err) {
      alert('❌ Error: ' + (err.response?.data?.message || 'Server Error'));
    }
  };

  if (loading && products.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-info" role="status"></div>
        <p className="mt-3 fw-bold">Connecting to NexaMart Inventory...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4" style={{color: '#003366'}}>NexaMart Admin Dashboard</h2>

      <div className="card shadow-sm border-0 rounded-0 p-4 mb-5 border-top border-4" style={{borderColor: '#00AEEF'}}>
        <h5 className="fw-bold mb-4" style={{color: '#003366'}}>Add New Product</h5>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold small">Product Name</label>
            <input type="text" className="form-control rounded-0" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold small">Price (LKR)</label>
            <input type="number" step="0.01" className="form-control rounded-0" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold small">Initial Stock</label>
            <input type="number" className="form-control rounded-0" value={stock} onChange={(e) => setStock(e.target.value)} required />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold small">Category</label>
            <select className="form-select rounded-0" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold small">Product Image</label>
            <input type="file" className="form-control rounded-0" onChange={(e) => setImages(e.target.files)} required />
          </div>
          <div className="col-12">
            <label className="form-label fw-bold small">Short Description</label>
            <input type="text" className="form-control rounded-0" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          {/* 🟢 Detailed Information textarea removed from here */}
          <div className="col-12 mt-4">
            <button type="submit" className="btn w-100 py-3 fw-bold rounded-0 text-white" style={{backgroundColor: '#00AEEF'}}>
                SAVE TO INVENTORY
            </button>
          </div>
        </form>
      </div>

      <h4 className="fw-bold mb-3" style={{color: '#003366'}}>Live Inventory Management</h4>
      <div className="table-responsive bg-white rounded-0 shadow-sm p-3 border">
        <table className="table align-middle">
          <thead className="bg-light">
            <tr className="small text-uppercase">
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock Status</th>
              <th className="text-end px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td className="fw-bold">{p.name}</td>
                <td><span className="badge rounded-0 px-2 py-1" style={{backgroundColor: '#e9ecef', color: '#003366'}}>{p.category}</span></td>
                <td className="fw-bold text-primary">{formatCurrency(p.price)}</td>
                <td>
                   <span className={`badge rounded-0 ${p.countInStock < 10 ? "bg-danger" : "bg-success"}`}>
                    {p.countInStock} Units
                   </span>
                </td>
                <td className="text-end px-4">
                  <button onClick={() => deleteProduct(p._id)} className="btn btn-sm btn-danger d-inline-flex align-items-center gap-2">
                    <i className="bi bi-trash3-fill"></i>
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;