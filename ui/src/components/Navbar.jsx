import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#1E3A8A] text-white px-6 py-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold text-[#60A5FA] tracking-wide"
        >
          NexaMart
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="hover:text-[#3B82F6] transition-colors duration-300 font-medium"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-[#3B82F6] transition-colors duration-300 font-medium"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="hover:text-[#3B82F6] transition-colors duration-300 font-medium"
          >
            Cart
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 border border-[#3B82F6] rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold hover:from-[#60A5FA] hover:to-[#3B82F6] transition-all duration-300"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-lg text-white font-semibold hover:from-[#60A5FA] hover:to-[#3B82F6] transition-all duration-300"
          >
            Sign Up
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 border border-[#3B82F6] rounded-lg hover:bg-gradient-to-r hover:from-[#3B82F6] hover:to-[#60A5FA] transition-all duration-300"
          >
            <FaUserCircle className="text-lg text-white" />
            <span className="font-medium">Profile</span>
          </Link>
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-center">
          <Link
            to="/"
            className="hover:text-[#3B82F6] transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-[#3B82F6] transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="hover:text-[#3B82F6] transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 border border-[#3B82F6] rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold hover:from-[#60A5FA] hover:to-[#3B82F6] transition-all duration-300 mx-auto"
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-lg text-white font-semibold hover:from-[#60A5FA] hover:to-[#3B82F6] transition-all duration-300 mx-auto"
            onClick={() => setMenuOpen(false)}
          >
            Sign Up
          </Link>
          <Link
            to="/profile"
            className="flex items-center justify-center gap-2 px-4 py-2 border border-[#3B82F6] rounded-lg hover:bg-gradient-to-r hover:from-[#3B82F6] hover:to-[#60A5FA] transition-all duration-300 mx-auto"
            onClick={() => setMenuOpen(false)}
          >
            <FaUserCircle className="text-lg text-white" />
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;