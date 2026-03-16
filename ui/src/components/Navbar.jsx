import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="shadow-sm fixed-top"
      style={{ backgroundColor: "#1E3A8A", zIndex: 1000 }}
    >
      {/* Row 1 */}
      <div className="container-fluid py-2 border-bottom border-light">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {/* Logo */}
          <Link
            to="/"
            className="fw-bold fs-3 text-decoration-none text-primary"
            style={{ color: "#60A5FA" }}
          >
            NexaMart
          </Link>

          {/* Right Side */}
          <div className="d-flex align-items-center flex-wrap">
            {/* Icons group */}
            <div className="d-flex align-items-center gap-3 me-3">
              {[
                {
                  to: "/wishlist",
                  icon: <FaHeart />,
                  badge: 2,
                  badgeColor: "bg-danger",
                },
                {
                  to: "/cart",
                  icon: <FaShoppingCart />,
                  badge: 3,
                  badgeColor: "bg-warning text-dark",
                },
                { to: "/profile", icon: <FaUserCircle /> },
              ].map((item, idx) => (
                <Link
                  key={idx}
                  to={item.to}
                  className="text-white position-relative icon-hover"
                  style={{ fontSize: "1.3rem", lineHeight: "1" }} // control icon size
                >
                  {item.icon}
                  {item.badge && (
                    <span
                      className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${item.badgeColor}`}
                      style={{ fontSize: "0.65rem", padding: "0.25em 0.4em" }} // control badge size
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Buttons group */}
            <div className="d-flex align-items-center gap-2">
              <Link to="/login">
                <button type="button" class="btn btn-primary">
                  Sign In
                </button>
              </Link>

              <Link to="/register">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-hover"
                >
                  Sign Up
                </button>
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="btn text-white d-lg-none ms-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Row 2 - Search */}
      <div className="container-fluid py-3 bg-white">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 d-flex flex-column flex-md-row gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
            />
            <button className="btn btn-primary">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Row 3 - Categories */}
      <div className="bg-light border-top d-none d-lg-block">
        <div className="container py-2">
          <div className="d-flex justify-content-center gap-5 flex-wrap">
            {[
              { name: "All Categories", path: "/categories" },
              { name: "Offers", path: "/offers" },
              { name: "For You", path: "/for-you" },
              { name: "New Arrivals", path: "/new-arrivals" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-dark text-decoration-none fw-medium link-hover"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="bg-white shadow d-lg-none">
          <div className="d-flex flex-column p-3 gap-3">
            <Link to="/categories" className="text-dark text-decoration-none">
              All Categories
            </Link>
            <Link to="/offers" className="text-dark text-decoration-none">
              Offers
            </Link>
            <Link to="/for-you" className="text-dark text-decoration-none">
              For You
            </Link>
            <Link to="/new-arrivals" className="text-dark text-decoration-none">
              New Arrivals
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
