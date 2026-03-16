import React from "react";

const FeaturedProducts = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <h2 className="fw-bold text-center mb-4">Featured Products</h2>

        <div className="row g-4">
          {[1, 2, 3, 4].map((item) => (
            <div className="col-md-3" key={item}>
              <div className="card shadow-sm border-0">
                <div
                  className="bg-secondary"
                  style={{ height: "180px" }}
                ></div>
                <div className="card-body text-center">
                  <h5>Product {item}</h5>
                  <p className="text-muted">$25.00</p>
                  <button className="btn btn-primary btn-sm">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;