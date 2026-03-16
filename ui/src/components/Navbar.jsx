import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-md shadow"
      style={{ backgroundColor: "#1E3A8A", padding: "1rem 2rem" }}
    >
      <div className="container">
        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3"
          style={{ color: "#60A5FA" }}
        >
          NexaMart
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="collapse navbar-collapse d-none d-md-flex justify-content-between">
          <ul className="navbar-nav mx-auto gap-4">
            <li className="nav-item">
              <Link className="nav-link text-white fw-medium" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-medium" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-medium" to="/cart">
                Cart
              </Link>
            </li>
          </ul>

          <div className="d-flex gap-2">
            <Link
              to="/login"
              className="btn"
              style={{
                background: "linear-gradient(to right, #3B82F6, #60A5FA)",
                color: "white",
              }}
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="btn"
              style={{
                background: "linear-gradient(to right, #3B82F6, #60A5FA)",
                color: "white",
              }}
            >
              Sign Up
            </Link>

            <Link
              to="/profile"
              className="btn btn-outline-light d-flex align-items-center gap-2"
            >
              <FaUserCircle />
              Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="d-md-none position-absolute top-100 start-0 w-100 shadow"
          style={{ backgroundColor: "#1E3A8A", padding: "1rem" }}
        >
          <div className="d-flex flex-column text-center gap-3">
            <Link
              to="/"
              className="text-white text-decoration-none"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-white text-decoration-none"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="text-white text-decoration-none"
              onClick={() => setMenuOpen(false)}
            >
              Cart
            </Link>
            <Link
              to="/login"
              className="btn"
              style={{
                background: "linear-gradient(to right, #3B82F6, #60A5FA)",
                color: "white",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="btn"
              style={{
                background: "linear-gradient(to right, #3B82F6, #60A5FA)",
                color: "white",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
            <Link
              to="/profile"
              className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <FaUserCircle />
              Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;