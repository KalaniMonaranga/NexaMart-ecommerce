import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

import Categories from "../components/Categories";
import Footer from "../components/Footer";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      <div className="mb-5">
      </div>

      <div className="pt-5">
        <Categories />
      </div>

      <section className="pt-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">NexaMart Product Catalogue</h2>

          {products.length === 0 ? (
            <p className="text-center text-muted">No products available.</p>
          ) : (
            <div className="row g-4">
              {products.map(product => (
                <div key={product._id} className="col-6 col-md-4 col-lg-3">
                  <div className="card h-100 shadow-sm border-0 product-card">
                    <div className="position-relative overflow-hidden">
                      <img
                        src={product.image || "https://via.placeholder.com/300"}
                        alt={product.name}
                        className="card-img-top"
                        style={{
                          height: "220px",
                          objectFit: "cover",
                          transition: "transform 0.3s",
                        }}
                      />
                    </div>
                    <div className="card-body text-center py-3">
                      <h5 className="card-title mb-2">{product.name}</h5>
                      <p className="fw-bold text-primary mb-3">${product.price}</p>
                      <button className="btn btn-primary w-100">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;