import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiStar, FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaBolt } from "react-icons/fa";

const ProductCard = ({ product, index, wishlist, toggleWishlist, addedIds, onAddToCart, badge }) => {
  const wished = wishlist.includes(product._id);
  const added = addedIds.includes(product._id);
  const fakeOld = (product.price * 1.3).toFixed(2);
  const disc = Math.round(((fakeOld - product.price) / fakeOld) * 100);

  return (
    <div className="fp-card" style={{ animationDelay: `${index * 0.09}s` }}>
      <div className="fp-img-wrap">
        <img
          src={product.image || "https://placehold.co/400x400/EFF6FF/1E3A8A?text=Product"}
          alt={product.name}
          loading="lazy"
        />

        <div className="fp-badges">
          {badge && <span className="fp-badge fp-badge--feat">{badge}</span>}
          <span className="fp-badge fp-badge--disc">-{disc}%</span>
        </div>

        <div className="fp-actions">
          <button
            className={`fp-act-btn${wished ? " wished" : ""}`}
            onClick={() => toggleWishlist(product._id)}
            aria-label="Wishlist"
          >
            <FiHeart />
          </button>
          <Link to={`/products/${product._id}`} className="fp-act-btn" aria-label="Quick view">
            <FiEye />
          </Link>
        </div>
      </div>

      <div className="fp-body">
        <div className="fp-stars">
          {[...Array(4)].map((_, s) => <FaStar key={s} />)}
          <FaStarHalfAlt />
          <span>(42)</span>
        </div>
        <div className="fp-name">{product.name}</div>
        <div className="fp-pricing">
          <strong>${product.price}</strong>
          <del>${fakeOld}</del>
        </div>
        <button
          className={`fp-cart-btn${added ? " added" : ""}`}
          onClick={() => onAddToCart(product._id)}
        >
          <FiShoppingCart />
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

const sharedStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

  .fp-wrap, .bs-wrap {
    font-family: 'DM Sans', sans-serif;
    padding: 60px 0 64px;
  }
  .fp-wrap { background: #F0F4FF; }
  .bs-wrap { background: #ffffff; }

  .fp-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 32px;
  }

  /* Header */
  .fp-hd {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 36px;
    gap: 12px;
    flex-wrap: wrap;
  }
  .fp-hd-left { display: flex; align-items: center; gap: 14px; }
  .fp-accent {
    width: 5px; height: 44px;
    background: linear-gradient(to bottom, #3B82F6, #60A5FA);
    border-radius: 4px;
    flex-shrink: 0;
  }
  .fp-sublabel {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: #3B82F6;
    margin-bottom: 4px;
  }
  .fp-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.3rem, 3vw, 1.8rem);
    font-weight: 800;
    color: #1E3A8A;
    letter-spacing: -0.4px;
    line-height: 1.1;
  }
  .fp-see-all {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    font-weight: 600;
    color: #3B82F6;
    text-decoration: none;
    border-bottom: 1.5px solid transparent;
    padding-bottom: 1px;
    white-space: nowrap;
    transition: gap 0.2s, color 0.2s, border-color 0.2s;
  }
  .fp-see-all:hover { gap: 10px; color: #1E3A8A; border-color: #1E3A8A; }

  /* Grid */
  .fp-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  /* Card */
  .fp-card {
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(30,58,138,0.07);
    border: 1px solid rgba(59,130,246,0.08);
    display: flex;
    flex-direction: column;
    transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease;
    animation: fpUp 0.5s ease both;
  }
  .fp-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 36px rgba(30,58,138,0.16);
  }

  /* Image */
  .fp-img-wrap {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1;
    background: #EFF6FF;
  }
  .fp-img-wrap img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.45s ease;
  }
  .fp-card:hover .fp-img-wrap img { transform: scale(1.07); }

  /* Badges */
  .fp-badges {
    position: absolute;
    top: 10px; left: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .fp-badge {
    font-size: 0.6rem;
    font-weight: 700;
    padding: 3px 8px;
    border-radius: 6px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
  }
  .fp-badge--feat { background: #1E3A8A; color: #fff; }
  .fp-badge--disc { background: #ef4444; color: #fff; }

  /* Hover action buttons */
  .fp-actions {
    position: absolute;
    top: 10px; right: 10px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    opacity: 0;
    transform: translateX(8px);
    transition: opacity 0.25s, transform 0.25s;
  }
  .fp-card:hover .fp-actions { opacity: 1; transform: translateX(0); }

  .fp-act-btn {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: rgba(255,255,255,0.92);
    border: none;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: #1E3A8A;
    font-size: 0.85rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    text-decoration: none;
    transition: background 0.2s, color 0.2s, transform 0.2s;
  }
  .fp-act-btn:hover { background: #1E3A8A; color: #fff; transform: scale(1.1); }
  .fp-act-btn.wished { color: #ef4444; }

  /* Body */
  .fp-body {
    padding: 14px 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 7px;
    flex: 1;
  }
  .fp-stars {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 0.7rem;
    color: #f59e0b;
  }
  .fp-stars span { color: #9ca3af; font-size: 0.7rem; margin-left: 3px; }

  .fp-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: #0f1e45;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .fp-pricing {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: auto;
  }
  .fp-pricing strong {
    font-family: 'Syne', sans-serif;
    font-size: 1.05rem;
    font-weight: 800;
    color: #1E3A8A;
  }
  .fp-pricing del { font-size: 0.8rem; color: #9ca3af; }

  .fp-cart-btn {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background: #1E3A8A;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 7px;
    margin-top: 8px;
    transition: background 0.2s, transform 0.15s;
  }
  .fp-cart-btn:hover { background: #3B82F6; transform: translateY(-1px); }
  .fp-cart-btn.added { background: #16a34a; }

  /* Empty */
  .fp-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 48px 0;
    color: #9ca3af;
    font-size: 0.95rem;
  }

  /* Responsive */
  @media (max-width: 960px) {
    .fp-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
  }
  @media (max-width: 560px) {
    .fp-wrap, .bs-wrap { padding: 40px 0 48px; }
    .fp-inner { padding: 0 16px; }
    .fp-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .fp-hd { margin-bottom: 20px; }
    .fp-body { padding: 10px 12px 14px; gap: 5px; }
    .fp-cart-btn { font-size: 0.78rem; padding: 9px; }
    .fp-pricing strong { font-size: 0.95rem; }
  }

  @keyframes fpUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export default function FeaturedProducts({ products }) {
  const [wishlist, setWishlist] = useState([]);
  const [addedIds, setAddedIds] = useState([]);

  const toggleWishlist = (id) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  const onAddToCart = (id) => {
    setAddedIds((a) => [...a, id]);
    setTimeout(() => setAddedIds((a) => a.filter((x) => x !== id)), 1500);
  };

  const badges = ["Featured", null, "New", null];

  return (
    <>
      <style>{sharedStyles}</style>
      <section className="fp-wrap">
        <div className="fp-inner">
          <div className="fp-hd">
            <div className="fp-hd-left">
              <div className="fp-accent" />
              <div>
                <div className="fp-sublabel"><FaBolt /> Editor's Pick</div>
                <div className="fp-title">Featured Products</div>
              </div>
            </div>
            <Link to="/products" className="fp-see-all">Browse All <FiArrowRight /></Link>
          </div>

          <div className="fp-grid">
            {products.length === 0 ? (
              <div className="fp-empty">No products available.</div>
            ) : (
              products.slice(0, 4).map((p, i) => (
                <ProductCard
                  key={p._id}
                  product={p}
                  index={i}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                  addedIds={addedIds}
                  onAddToCart={onAddToCart}
                  badge={badges[i]}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
