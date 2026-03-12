import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1E3A8A] text-white px-6 py-10 mt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Link to="/" className="text-2xl font-extrabold text-[#60A5FA]">
            NexaMart
          </Link>
          <p className="text-[#E5E7EB] mt-2">
            NexaMart is your one-stop online shop for quality products at great prices. Stay connected with us through social media.
          </p>

          <div className="flex mt-4 gap-4">
            <a href="#" className="p-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] hover:opacity-80 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="p-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] hover:opacity-80 transition">
              <FaTwitter />
            </a>
            <a href="#" className="p-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] hover:opacity-80 transition">
              <FaInstagram />
            </a>
            <a href="#" className="p-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] hover:opacity-80 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-[#60A5FA] font-semibold">Shop</h3>
            <Link to="/" className="hover:text-[#3B82F6] transition">Home</Link>
            <Link to="/products" className="hover:text-[#3B82F6] transition">Products</Link>
            <Link to="/cart" className="hover:text-[#3B82F6] transition">Cart</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[#60A5FA] font-semibold">Account</h3>
            <Link to="/profile" className="hover:text-[#3B82F6] transition">Profile</Link>
            <Link to="/login" className="hover:text-[#3B82F6] transition">Sign In</Link>
            <Link to="/register" className="hover:text-[#3B82F6] transition">Sign Up</Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 border-t border-[#3B82F6] pt-4 text-center text-[#E5E7EB] text-sm">
        © 2026 NexaMart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;