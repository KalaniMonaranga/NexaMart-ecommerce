import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import BestSellers from "../components/BestSellers";
import PopularCategories from "../components/PopularCategories";
import PopupBanner from "../components/PopupBanner";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
    
  {/* <PopupBanner /> */}

  <div className="pt-5">
    <Categories />
  </div>

  <FeaturedProducts products={products} />
  <BestSellers products={products} />
  <PopularCategories />


      <section className="pt-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">
            NexaMart Product Catalogue
          </h2>

          {products.length === 0 ? (
            <p className="text-center text-muted">No products available.</p>
          ) : (
            <div className="row g-4">
              {products.map((product) => (
                <div key={product._id} className="col-6 col-md-4 col-lg-3">
                  <div className="card h-100 shadow-sm border-0">
                    <img
                      src={product.image || "https://via.placeholder.com/300"}
                      alt={product.name}
                      className="card-img-top"
                      style={{ height: "220px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center">
                      <h5>{product.name}</h5>
                      <p className="fw-bold text-primary">${product.price}</p>
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
