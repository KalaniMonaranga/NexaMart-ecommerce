import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminProfile = ({ user }) => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: 'Grocery and Hampers',
    countInStock: '',
    description: ''
  });
  const [productImage, setProductImage] = useState(null);

  const categories = [
    "Grocery and Hampers", "Fruits", "Food and Restaurant", 
    "Books and Stationery", "Home and Lifestyle"
  ];

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
    } catch (err) { console.error("Error fetching products", err); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(num).replace("LKR", "Rs.");
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('category', productData.category);
    formData.append('countInStock', productData.countInStock);
    formData.append('description', productData.description);
    
    // 🟢 Fix: Matching your backend's 'images' array requirement
    if (productImage) {
      formData.append('images', productImage); 
    }

    try {
      // 🟢 Fix: Added proper headers for file upload
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      await axios.post('http://localhost:5000/api/products', formData, config);
      
      alert("✅ Product added to NexaMart Inventory!");
      setShowProductForm(false);
      fetchProducts(); 
      
      // Reset Image state
      setProductImage(null);
    } catch (err) { 
      console.error(err);
      alert("❌ Error saving product: " + (err.response?.data?.message || "Server Error")); 
    }
  };

  return (
    <div className="container my-5 hmart-theme">
      <div className="row g-4">
        {/* Left Side: Admin Identity */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm text-center p-4 h-100 rounded-0">
            <div className="mb-3">
              <i className="fa fa-user-shield text-navy" style={{fontSize: '60px'}}></i>
            </div>
            <h4 className="fw-bold text-navy">{user?.name || 'System Admin'}</h4>
            <span className="badge bg-danger mb-3 px-3 py-2 rounded-0">ROOT ACCESS</span>
            
            <div className="mt-4 p-3 bg-danger-subtle rounded-0 border-start border-danger border-4 text-start">
              <h6 className="text-danger fw-bold mb-2 small text-uppercase">⚠️ Stock Alerts</h6>
              <ul className="list-unstyled mb-0">
                {products.filter(p => p.countInStock <= 0).length > 0 ? (
                  products.filter(p => p.countInStock <= 0).map(p => (
                    <li key={p._id} className="small border-bottom border-danger border-opacity-10 py-2 d-flex justify-content-between">
                      <span>{p.name}</span>
                      <span className="text-danger fw-bold text-uppercase">Out</span>
                    </li>
                  ))
                ) : (
                  <li className="small text-success fw-bold">All items in stock ✅</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Side: Admin Tools */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100 p-4 rounded-0">
             <h3 className="text-navy fw-bold mb-4">NexaMart Management Console</h3>

              {showProductForm && (
                <div className="card bg-light p-4 mb-4 border-0 rounded-0 border-top border-sky border-4">
                  <h5 className="fw-bold text-navy mb-3">Add New Inventory Item</h5>
                  <form onSubmit={handleAddProduct} className="row g-3">
                    <div className="col-md-8">
                      <label className="small fw-bold">Product Name</label>
                      <input type="text" className="form-control rounded-0" onChange={(e) => setProductData({...productData, name: e.target.value})} required />
                    </div>
                    <div className="col-md-4">
                      <label className="small fw-bold">Price (Rs.)</label>
                      <input type="number" step="0.01" className="form-control rounded-0" onChange={(e) => setProductData({...productData, price: e.target.value})} required />
                    </div>
                    <div className="col-md-6">
                      <label className="small fw-bold">Category</label>
                      <select className="form-select rounded-0" onChange={(e) => setProductData({...productData, category: e.target.value})}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="small fw-bold">Stock Quantity</label>
                      <input type="number" className="form-control rounded-0" onChange={(e) => setProductData({...productData, countInStock: e.target.value})} required />
                    </div>
                    <div className="col-12">
                      <label className="small fw-bold">Product Image</label>
                      <input type="file" className="form-control rounded-0" onChange={(e) => setProductImage(e.target.files[0])} required />
                    </div>
                    <div className="col-12 d-flex gap-2 mt-3">
                      <button type="submit" className="btn btn-sky flex-grow-1 fw-bold rounded-0 py-2">SAVE TO DATABASE</button>
                      <button type="button" className="btn btn-secondary rounded-0 px-4" onClick={() => setShowProductForm(false)}>CANCEL</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
                <div>
                  <h6 className="mb-0 fw-bold text-navy">Inventory Control</h6>
                  <small className="text-muted">Manage real-time stock and pricing levels.</small>
                </div>
                <button className="btn btn-sky shadow-sm rounded-0 fw-bold" onClick={() => setShowProductForm(true)}>+ ADD PRODUCT</button>
              </div>

              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead>
                    <tr className="small text-muted text-uppercase">
                      <th>Name</th>
                      <th>Stock</th>
                      <th className="text-end">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 5).map(p => (
                      <tr key={p._id}>
                        <td className="fw-bold">{p.name}</td>
                        <td>
                          <span className={p.countInStock < 5 ? "badge bg-danger rounded-0" : "badge bg-success rounded-0"}>
                            {p.countInStock}
                          </span>
                        </td>
                        <td className="fw-bold text-end text-navy">{formatCurrency(p.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;