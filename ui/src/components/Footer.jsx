import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-white mt-5 py-5"
      style={{ backgroundColor: "#1E3A8A" }}
    >
      <div className="container">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-md-6">
            <Link
              to="/"
              className="fw-bold fs-3 text-decoration-none"
              style={{ color: "#60A5FA" }}
            >
              NexaMart
            </Link>

            <p className="mt-3" style={{ color: "#E5E7EB" }}>
              NexaMart is your one-stop online shop for quality products at
              great prices. Stay connected with us through social media.
            </p>

            <div className="d-flex gap-3 mt-3">
              <a
                href="#"
                className="btn rounded-circle text-white"
                style={{
                  background: "linear-gradient(to right, #3B82F6, #60A5FA)",
                }}
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="btn rounded-circle text-white"
                style={{
                  background: "linear-gradient(to right, #3B82F6, #60A5FA)",
                }}
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="btn rounded-circle text-white"
                style={{
                  background: "linear-gradient(to right, #3B82F6, #60A5FA)",
                }}
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="btn rounded-circle text-white"
                style={{
                  background: "linear-gradient(to right, #3B82F6, #60A5FA)",
                }}
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Links Section */}
          <div className="col-md-6">
            <div className="row">
              <div className="col-6">
                <h5 style={{ color: "#60A5FA" }}>Shop</h5>
                <div className="d-flex flex-column gap-2">
                  <Link to="/" className="text-white text-decoration-none">
                    Home
                  </Link>
                  <Link
                    to="/products"
                    className="text-white text-decoration-none"
                  >
                    Products
                  </Link>
                  <Link to="/cart" className="text-white text-decoration-none">
                    Cart
                  </Link>
                </div>
              </div>

              <div className="col-6">
                <h5 style={{ color: "#60A5FA" }}>Account</h5>
                <div className="d-flex flex-column gap-2">
                  <Link
                    to="/profile"
                    className="text-white text-decoration-none"
                  >
                    Profile
                  </Link>
                  <Link to="/login" className="text-white text-decoration-none">
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="text-white text-decoration-none"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="text-center mt-4 pt-3"
          style={{
            borderTop: "1px solid #3B82F6",
            color: "#E5E7EB",
            fontSize: "14px",
          }}
        >
          © 2026 NexaMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;