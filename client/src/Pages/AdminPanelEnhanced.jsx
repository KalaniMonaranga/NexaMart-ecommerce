import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    price: '',
    category: '',
    countInStock: '',
    description: ''
  });

  // Form State for adding new products
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Grocery and Hampers');
  const [stock, setStock] = useState('');
  const [images, setImages] = useState(null); 
  const [description, setDescription] = useState('');

  const categories = [
    "Grocery and Hampers", "Fruits", "Food and Restaurant", 
    "Books and Stationery", "Home and Lifestyle", "Electronics",
    "Clothing and Fashion", "Sports and Outdoors", "Beauty and Personal Care",
    "Toys and Games", "Automotive", "Health and Wellness"
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

  // Check if user is admin
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const config = {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
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
    formData.append('countInStock', stock);
    formData.append('category', category);

    if (images && images.length > 0) {
      formData.append('image', images[0]); 
    }

    try {
      const config = { 
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
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

  // View product details
  const viewProductDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Edit product
  const editProduct = (product) => {
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
      description: product.description
    });
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  // Update product
  const updateProduct = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      
      await axios.put(`http://localhost:5000/api/products/${selectedProduct._id}`, editForm, config);
      alert('✅ Product updated successfully!');
      setShowEditModal(false);
      fetchProducts();
    } catch (err) {
      alert(`❌ Error: ${err.response?.data?.message || "Update failed"}`);
    }
  };

  // Add sample products
  const addSampleProducts = async () => {
    const sampleProducts = [
      {
        name: "Fresh Red Apples",
        price: 450,
        category: "Fruits",
        countInStock: 50,
        description: "Fresh and crispy red apples from local farms",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=200"
      },
      {
        name: "Organic Honey",
        price: 850,
        category: "Grocery and Hampers",
        countInStock: 25,
        description: "Pure organic honey from Sri Lankan bee farms",
        image: "https://images.unsplash.com/photo-1546548970-71785318a17b?w=200"
      },
      {
        name: "Rice and Curry Set",
        price: 650,
        category: "Food and Restaurant",
        countInStock: 30,
        description: "Traditional Sri Lankan rice and curry meal",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200"
      },
      {
        name: "Notebook Set",
        price: 1200,
        category: "Books and Stationery",
        countInStock: 40,
        description: "Premium quality notebook set with pens",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200"
      },
      {
        name: "Decorative Lamp",
        price: 3500,
        category: "Home and Lifestyle",
        countInStock: 15,
        description: "Elegant decorative lamp for home decoration",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"
      },
      {
        name: "Wireless Headphones",
        price: 4500,
        category: "Electronics",
        countInStock: 20,
        description: "High-quality wireless headphones with noise cancellation",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200"
      },
      {
        name: "Cotton T-Shirt",
        price: 990,
        category: "Clothing and Fashion",
        countInStock: 35,
        description: "Comfortable 100% cotton t-shirt",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200"
      },
      {
        name: "Yoga Mat",
        price: 2500,
        category: "Sports and Outdoors",
        countInStock: 25,
        description: "Non-slip yoga mat for exercise and meditation",
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=200"
      },
      {
        name: "Face Cream",
        price: 1250,
        category: "Beauty and Personal Care",
        countInStock: 30,
        description: "Moisturizing face cream with natural ingredients",
        image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200"
      },
      {
        name: "Board Game Set",
        price: 3200,
        category: "Toys and Games",
        countInStock: 18,
        description: "Classic board game collection for family fun",
        image: "https://images.unsplash.com/photo-1587121381325-3d0a4a2e6a18?w=200"
      }
    ];

    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      for (const product of sampleProducts) {
        await axios.post('http://localhost:5000/api/products', product, config);
      }

      alert('✅ Sample products added successfully!');
      fetchProducts();
    } catch (err) {
      alert(`❌ Error: ${err.response?.data?.message || "Failed to add sample products"}`);
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{color: '#003366'}}>NexaMart Admin Dashboard</h2>
        <button 
          onClick={addSampleProducts}
          className="btn btn-success"
        >
          <i className="bi bi-plus-circle me-2"></i>
          Add Sample Products
        </button>
      </div>

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
            <input type="file" className="form-control rounded-0" onChange={(e) => setImages(e.target.files)} />
          </div>
          <div className="col-12">
            <label className="form-label fw-bold small">Short Description</label>
            <input type="text" className="form-control rounded-0" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
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
              <tr key={p._id} style={{cursor: 'pointer'}} onClick={() => viewProductDetails(p)}>
                <td className="fw-bold">{p.name}</td>
                <td><span className="badge rounded-0 px-2 py-1" style={{backgroundColor: '#e9ecef', color: '#003366'}}>{p.category}</span></td>
                <td className="fw-bold text-primary">{formatCurrency(p.price)}</td>
                <td>
                   <span className={`badge rounded-0 ${p.countInStock < 10 ? "bg-danger" : "bg-success"}`}>
                    {p.countInStock} Units
                   </span>
                </td>
                <td className="text-end px-4" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => editProduct(p)} 
                    className="btn btn-sm btn-warning d-inline-flex align-items-center gap-2 me-2"
                  >
                    <i className="bi bi-pencil-fill"></i>
                    <span>Edit</span>
                  </button>
                  <button 
                    onClick={() => deleteProduct(p._id)} 
                    className="btn btn-sm btn-danger d-inline-flex align-items-center gap-2"
                  >
                    <i className="bi bi-trash3-fill"></i>
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Product Details</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4">
                    {selectedProduct.images && selectedProduct.images.length > 0 ? (
                      <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="img-fluid rounded" />
                    ) : (
                      <div className="bg-light d-flex align-items-center justify-content-center rounded" style={{height: '200px'}}>
                        <i className="bi bi-image fs-1 text-muted"></i>
                      </div>
                    )}
                  </div>
                  <div className="col-md-8">
                    <h4>{selectedProduct.name}</h4>
                    <p className="text-muted">{selectedProduct.description}</p>
                    <div className="row">
                      <div className="col-6">
                        <strong>Category:</strong> {selectedProduct.category}
                      </div>
                      <div className="col-6">
                        <strong>Price:</strong> {formatCurrency(selectedProduct.price)}
                      </div>
                      <div className="col-6 mt-2">
                        <strong>Stock:</strong> {selectedProduct.countInStock} units
                      </div>
                      <div className="col-6 mt-2">
                        <strong>Status:</strong> 
                        <span className={`badge ms-2 ${selectedProduct.countInStock > 0 ? 'bg-success' : 'bg-danger'}`}>
                          {selectedProduct.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button type="button" className="btn btn-warning" onClick={() => { setShowModal(false); editProduct(selectedProduct); }}>
                  <i className="bi bi-pencil me-2"></i>Edit Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">Price (LKR)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={editForm.price}
                      onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Stock</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={editForm.countInStock}
                      onChange={(e) => setEditForm({...editForm, countInStock: e.target.value})}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-select" 
                    value={editForm.category}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="form-control" 
                    rows="3"
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="button" className="btn btn-warning" onClick={updateProduct}>
                  <i className="bi bi-check me-2"></i>Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
