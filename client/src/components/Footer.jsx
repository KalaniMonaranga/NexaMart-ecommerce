import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light mt-5">
      <div className="container py-5">
        <div className="row">
          {/* About Section */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">
              <i className="bi bi-shop me-2"></i>NexaMart
            </h5>
            <p className="text-light-emphasis small">
              Your trusted online shopping destination in Sri Lanka. 
              Quality products, competitive prices, and excellent service.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light"><i className="bi bi-facebook fs-5"></i></a>
              <a href="#" className="text-light"><i className="bi bi-instagram fs-5"></i></a>
              <a href="#" className="text-light"><i className="bi bi-twitter fs-5"></i></a>
              <a href="#" className="text-light"><i className="bi bi-youtube fs-5"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/shop" className="text-light text-decoration-none">
                  <i className="bi bi-chevron-right me-1 small"></i>Shop
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/cart" className="text-light text-decoration-none">
                  <i className="bi bi-chevron-right me-1 small"></i>Cart
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/wishlist" className="text-light text-decoration-none">
                  <i className="bi bi-chevron-right me-1 small"></i>Wishlist
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/my-orders" className="text-light text-decoration-none">
                  <i className="bi bi-chevron-right me-1 small"></i>My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/about" className="text-light text-decoration-none">
                  <i className="bi bi-chevron-right me-1 small"></i>About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-light text-decoration-none">
                  <i className="bi bi-chevron-right me-1 small"></i>Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-light text-decoration-none">
                  <i className="bi bi-chevron-right me-1 small"></i>Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/terms" className="text-light text-decoration-none">
                  <i className="bi bi-chevron-right me-1 small"></i>Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 mb-4">
            <h6 className="fw-bold mb-3">Contact</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                123 Main Street, Colombo, Sri Lanka
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                support@nexamart.com
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                +94 11 234 5678
              </li>
              <li className="mb-2">
                <i className="bi bi-clock me-2"></i>
                Mon - Sat: 9AM - 6PM
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary my-4" />

        {/* Bottom Footer */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 small text-light-emphasis">
              © {currentYear} NexaMart. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <p className="mb-0 small text-light-emphasis">
              Made with <i className="bi bi-heart-fill text-danger"></i> in Sri Lanka
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
