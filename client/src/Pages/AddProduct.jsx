import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  // 1. State for all fields
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]); // This would come from your Upload logic

  // 2. Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // The data object we verified earlier
    const productData = {
      name,
      description,
      price,
      countInStock,
      category,
      images: uploadedImages.length > 0 ? uploadedImages : ["/uploads/default.png"] 
    };

    try {
      const { data } = await axios.post('http://localhost:5000/api/products', productData);
      alert('🚀 Product Added Successfully!');
      // Reset form
      setName('');
      setPrice(0);
      setCountInStock(0);
    } catch (error) {
      console.error("Upload failed", error);
      alert('❌ Error adding product. Check your Server terminal.');
    }
  };

  return (
    <div className="hmart-theme container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 shadow-sm p-4 bg-white border">
          <h3 className="fw-bold text-navy mb-4 border-bottom pb-2">Add New Product</h3>
          
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-3">
              <label className="form-label fw-bold small text-navy">Product Name</label>
              <input type="text" className="form-control rounded-0" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="row">
              {/* Price Field */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold small text-navy">Price (Rs.)</label>
                <input type="number" className="form-control rounded-0" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
              </div>

              {/* Your Stock Field 🟢 */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold small text-navy">Quantity in Stock</label>
                <input 
                  type="number" 
                  className="form-control rounded-0" 
                  placeholder="e.g. 50"
                  min="0" 
                  value={countInStock} 
                  onChange={(e) => setCountInStock(Number(e.target.value))} 
                  style={{ borderColor: '#ddd' }}
                />
              </div>
            </div>

            {/* Category Field */}
            <div className="mb-3">
              <label className="form-label fw-bold small text-navy">Category</label>
              <select className="form-select rounded-0" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                <option value="Food and Restaurant">Food and Restaurant</option>
                <option value="Groceries">Groceries</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-navy">Description</label>
              <textarea className="form-control rounded-0" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>

            {/* Submit Button - Sky Blue */}
            <button type="submit" className="btn w-100 fw-bold py-2 rounded-0" style={{ backgroundColor: '#00AEEF', color: 'white' }}>
              SAVE PRODUCT TO NEXAMART
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;