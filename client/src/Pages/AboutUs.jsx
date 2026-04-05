import React from 'react';

const AboutUs = () => {
  return (
    <div className="container py-5" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Page Header */}
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="fw-bold" style={{ color: '#003366' }}>
            <i className="bi bi-info-circle-fill me-2"></i>About Us
          </h1>
          <p className="text-muted">Learn more about NexaMart Online Shop</p>
        </div>
      </div>

      {/* Company Story */}
      <div className="row mb-5">
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <h4 className="fw-bold mb-3" style={{ color: '#003366' }}>
                <i className="bi bi-building me-2"></i>Our Story
              </h4>
              <p className="text-muted">
                NexaMart was founded in 2020 with a simple mission: to provide high-quality products 
                at affordable prices to customers across Sri Lanka. What started as a small online 
                store has grown into one of the most trusted e-commerce platforms in the country.
              </p>
              <p className="text-muted">
                We believe in making online shopping easy, convenient, and enjoyable for everyone. 
                Our commitment to customer satisfaction and quality has made us a preferred choice 
                for thousands of happy customers.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div 
            className="bg-light rounded d-flex align-items-center justify-content-center h-100"
            style={{ minHeight: '250px' }}
          >
            <div className="text-center">
              <i className="bi bi-shop display-1 text-primary"></i>
              <h5 className="mt-3 fw-bold" style={{ color: '#003366' }}>NexaMart</h5>
              <p className="text-muted">Your Trusted Online Shop</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="row mb-5">
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderLeft: '4px solid #003366' }}>
            <div className="card-body">
              <h4 className="fw-bold mb-3" style={{ color: '#003366' }}>
                <i className="bi bi-bullseye me-2"></i>Our Mission
              </h4>
              <p className="text-muted">
                To provide customers with a seamless online shopping experience by offering 
                a wide range of quality products at competitive prices, backed by excellent 
                customer service and fast, reliable delivery.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderLeft: '4px solid #28a745' }}>
            <div className="card-body">
              <h4 className="fw-bold mb-3" style={{ color: '#003366' }}>
                <i className="bi bi-eye me-2"></i>Our Vision
              </h4>
              <p className="text-muted">
                To become the leading e-commerce platform in Sri Lanka, known for our 
                commitment to quality, innovation, and customer satisfaction. We aim to 
                connect customers with the products they love, making life easier and more 
                enjoyable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="row mb-5">
        <div className="col-12 text-center mb-4">
          <h3 className="fw-bold" style={{ color: '#003366' }}>Why Choose Us?</h3>
        </div>
        
        <div className="col-md-3 col-6 mb-4">
          <div className="card border-0 shadow-sm text-center h-100">
            <div className="card-body">
              <i className="bi bi-shield-check display-4 text-success mb-3"></i>
              <h6 className="fw-bold">Quality Products</h6>
              <p className="text-muted small">Only the best products from trusted brands</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6 mb-4">
          <div className="card border-0 shadow-sm text-center h-100">
            <div className="card-body">
              <i className="bi bi-truck display-4 text-primary mb-3"></i>
              <h6 className="fw-bold">Fast Delivery</h6>
              <p className="text-muted small">Quick and reliable delivery across Sri Lanka</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6 mb-4">
          <div className="card border-0 shadow-sm text-center h-100">
            <div className="card-body">
              <i className="bi bi-headset display-4 text-warning mb-3"></i>
              <h6 className="fw-bold">24/7 Support</h6>
              <p className="text-muted small">Always here to help with your questions</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-6 mb-4">
          <div className="card border-0 shadow-sm text-center h-100">
            <div className="card-body">
              <i className="bi bi-lock display-4 text-danger mb-3"></i>
              <h6 className="fw-bold">Secure Payment</h6>
              <p className="text-muted small">100% secure and encrypted transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm bg-primary text-white">
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3 col-6 mb-3">
                  <h2 className="fw-bold">10,000+</h2>
                  <p className="mb-0">Happy Customers</p>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <h2 className="fw-bold">5,000+</h2>
                  <p className="mb-0">Products</p>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <h2 className="fw-bold">25+</h2>
                  <p className="mb-0">Categories</p>
                </div>
                <div className="col-md-3 col-6 mb-3">
                  <h2 className="fw-bold">4+</h2>
                  <p className="mb-0">Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h3 className="fw-bold" style={{ color: '#003366' }}>Our Team</h3>
          <p className="text-muted">Meet the people behind NexaMart</p>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm text-center h-100">
            <div className="card-body">
              <div 
                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: '80px', height: '80px' }}
              >
                <span className="fw-bold fs-3">JD</span>
              </div>
              <h6 className="fw-bold">John Doe</h6>
              <p className="text-muted small">Founder & CEO</p>
              <p className="text-muted small">Leading NexaMart with passion and dedication</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm text-center h-100">
            <div className="card-body">
              <div 
                className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: '80px', height: '80px' }}
              >
                <span className="fw-bold fs-3">JS</span>
              </div>
              <h6 className="fw-bold">Jane Smith</h6>
              <p className="text-muted small">Operations Manager</p>
              <p className="text-muted small">Ensuring smooth day-to-day operations</p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card border-0 shadow-sm text-center h-100">
            <div className="card-body">
              <div 
                className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                style={{ width: '80px', height: '80px' }}
              >
                <span className="fw-bold fs-3">MJ</span>
              </div>
              <h6 className="fw-bold">Mike Johnson</h6>
              <p className="text-muted small">Customer Support Lead</p>
              <p className="text-muted small">Dedicated to excellent customer service</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
