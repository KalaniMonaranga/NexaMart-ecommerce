import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Grocery and Hampers',
    countInStock: '',
    description: '',
    images: []
  });

  const [imagePreview, setImagePreview] = useState('');
  const [currentImages, setCurrentImages] = useState([]);

  const categories = [
    "Grocery and Hampers", "Fruits", "Food and Restaurant", 
    "Books and Stationery", "Home and Lifestyle"
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setFormData({
          name: data.name,
          price: data.price,
          category: data.category,
          countInStock: data.countInStock,
          description: data.description,
          images: data.images || []
        });
        setCurrentImages(data.images || []);
        if (data.images && data.images.length > 0) {
          setImagePreview(data.images[0]);
        }
        setFetchLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setMessage('Failed to fetch product details');
        setFetchLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('countInStock', formData.countInStock);
      formDataToSend.append('description', formData.description);

      // Add new image if selected
      if (imagePreview && !imagePreview.startsWith('http')) {
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        formDataToSend.append('image', blob);
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      };

      await axios.put(`http://localhost:5000/api/products/${id}`, formDataToSend, config);
      setMessage('Product updated successfully!');
      
      setTimeout(() => {
        navigate('/admin');
      }, 2000);

    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                <i className="bi bi-pencil me-2"></i>Edit Product
              </h4>
            </div>
            <div className="card-body">
              {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Price (Rs.)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Stock Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="countInStock"
                      value={formData.countInStock}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Product Image</label>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <small className="text-muted">Leave empty to keep current image</small>
                    </div>
                    <div className="col-md-6">
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="Product preview"
                          className="img-thumbnail"
                          style={{ maxHeight: '100px' }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {currentImages.length > 0 && (
                  <div className="mb-3">
                    <label className="form-label">Current Images</label>
                    <div className="d-flex gap-2">
                      {currentImages.map((img, index) => (
                        <img
                          key={index}
                          src={img}
                          alt={`Product ${index + 1}`}
                          className="img-thumbnail"
                          style={{ maxHeight: '80px' }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check me-2"></i>
                        Update Product
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin')}
                  >
                    <i className="bi bi-x me-2"></i>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
