import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight, FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";
import { FaStar, FaStarHalfAlt, FaFire } from "react-icons/fa";

export default function BestSellers({ products }) {
  const [wishlist, setWishlist] = useState([]);
  const [addedIds, setAddedIds] = useState([]);

  const toggleWishlist = (id) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  const onAddToCart = (id) => {
    setAddedIds((a) => [...a, id]);
    setTimeout(() => setAddedIds((a) => a.filter((x) => x !== id)), 1500);
  };

  const bsSellers = products.slice(4, 8);
  const badges = ["Best Seller", "#1 Pick", null, "Top Rated"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

        .bs-wrap {
          font-family: 'DM Sans', sans-serif;
          background: #ffffff;
          padding: 60px 0 64px;
        }
        .bs-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* Header */
        .bs-hd {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 36px;
          gap: 12px;
          flex-wrap: wrap;
        }
        .bs-hd-left { display: flex; align-items: center; gap: 14px; }
        .bs-accent {
          width: 5px; height: 44px;
          background: linear-gradient(to bottom, #1E3A8A, #60A5FA);
          border-radius: 4px;
          flex-shrink: 0;
        }
        .bs-sublabel {
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
        .bs-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.3rem, 3vw, 1.8rem);
          font-weight: 800;
          color: #1E3A8A;
          letter-spacing: -0.4px;
          line-height: 1.1;
        }
        .bs-see-all {
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
        .bs-see-all:hover { gap: 10px; color: #1E3A8A; border-color: #1E3A8A; }

        /* Grid */
        .bs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        /* Card — horizontal layout with rank number */
        .bs-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid #E5E7EB;
          display: flex;
          flex-direction: column;
          box-shadow: 0 2px 12px rgba(30,58,138,0.06);
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.28s ease;
          animation: bsUp 0.5s ease both;
          position: relative;
        }
        .bs-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 36px rgba(30,58,138,0.15);
          border-color: #60A5FA;
        }

        /* rank badge */
        .bs-rank {
          position: absolute;
          top: 12px; left: 12px;
          width: 28px; height: 28px;
          border-radius: 50%;
          background: #1E3A8A;
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem;
          font-weight: 800;
          display: flex; align-items: center; justify-content: center;
          z-index: 3;
          border: 2px solid #fff;
          box-shadow: 0 2px 8px rgba(30,58,138,0.3);
        }
        .bs-rank.top { background: #f59e0b; }

        /* image */
        .bs-img-wrap {
          position: relative;
          overflow: hidden;
          aspect-ratio: 1;
          background: #EFF6FF;
        }
        .bs-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.45s ease;
        }
        .bs-card:hover .bs-img-wrap img { transform: scale(1.07); }

        /* Badges */
        .bs-badges {
          position: absolute;
          top: 12px; right: 12px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: flex-end;
        }
        .bs-badge {
          font-size: 0.58rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          letter-spacing: 0.4px;
          text-transform: uppercase;
        }
        .bs-badge--label { background: #3B82F6; color: #fff; }
        .bs-badge--hot   { background: #ef4444; color: #fff; }

        /* hover actions */
        .bs-actions {
          position: absolute;
          bottom: 12px; right: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .bs-card:hover .bs-actions { opacity: 1; transform: translateY(0); }
        .bs-act-btn {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          color: #1E3A8A;
          font-size: 0.8rem;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }
        .bs-act-btn:hover { background: #1E3A8A; color: #fff; transform: scale(1.1); }
        .bs-act-btn.wished { color: #ef4444; }

        /* body */
        .bs-body {
          padding: 14px 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 7px;
          flex: 1;
        }
        .bs-stars {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 0.7rem;
          color: #f59e0b;
        }
        .bs-stars span { color: #9ca3af; font-size: 0.7rem; margin-left: 3px; }

        .bs-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #0f1e45;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bs-sold {
          font-size: 0.72rem;
          color: #3B82F6;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .bs-pricing {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: auto;
        }
        .bs-pricing strong {
          font-family: 'Syne', sans-serif;
          font-size: 1.05rem;
          font-weight: 800;
          color: #1E3A8A;
        }
        .bs-pricing del { font-size: 0.8rem; color: #9ca3af; }
        .bs-pricing .bs-disc {
          font-size: 0.7rem;
          font-weight: 700;
          color: #ef4444;
          background: #fef2f2;
          padding: 2px 6px;
          border-radius: 5px;
        }

        .bs-cart-btn {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(135deg, #1E3A8A, #3B82F6);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          margin-top: 8px;
          transition: opacity 0.2s, transform 0.15s;
        }
        .bs-cart-btn:hover { opacity: 0.88; transform: translateY(-1px); }
        .bs-cart-btn.added { background: #16a34a; }

        /* empty */
        .bs-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 48px 0;
          color: #9ca3af;
        }

        /* Responsive */
        @media (max-width: 960px) {
          .bs-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
        }
        @media (max-width: 560px) {
          .bs-wrap { padding: 40px 0 48px; }
          .bs-inner { padding: 0 16px; }
          .bs-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .bs-hd { margin-bottom: 20px; }
          .bs-body { padding: 10px 12px 14px; gap: 5px; }
          .bs-cart-btn { font-size: 0.78rem; padding: 9px; }
        }

        @keyframes bsUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="bs-wrap">
        <div className="bs-inner">

          <div className="bs-hd">
            <div className="bs-hd-left">
              <div className="bs-accent" />
              <div>
                <div className="bs-sublabel"><FaFire /> This Week</div>
                <div className="bs-title">Best Sellers</div>
              </div>
            </div>
            <Link to="/products" className="bs-see-all">Browse All <FiArrowRight /></Link>
          </div>

          <div className="bs-grid">
            {bsSellers.length === 0 ? (
              <div className="bs-empty">No products available.</div>
            ) : (
              bsSellers.map((p, i) => {
                const fakeOld = (p.price * 1.28).toFixed(2);
                const disc = Math.round(((fakeOld - p.price) / fakeOld) * 100);
                const wished = wishlist.includes(p._id);
                const added = addedIds.includes(p._id);
                const soldNums = [1240, 890, 2100, 640];

                return (
                  <div
                    key={p._id}
                    className="bs-card"
                    style={{ animationDelay: `${i * 0.09}s` }}
                  >
          
                    <div className={`bs-rank${i === 0 ? " top" : ""}`}>#{i + 1}</div>

                    <div className="bs-img-wrap">
                      <img
                        src={p.image || "https://placehold.co/400x400/EFF6FF/1E3A8A?text=Product"}
                        alt={p.name}
                        loading="lazy"
                      />
  
                      <div className="bs-badges">
                        {badges[i] && <span className="bs-badge bs-badge--label">{badges[i]}</span>}
                        {i === 0 && <span className="bs-badge bs-badge--hot">Hot</span>}
                      </div>

                      <div className="bs-actions">
                        <button
                          className={`bs-act-btn${wished ? " wished" : ""}`}
                          onClick={() => toggleWishlist(p._id)}
                          aria-label="Wishlist"
                        >
                          <FiHeart />
                        </button>
                        <Link to={`/products/${p._id}`} className="bs-act-btn" aria-label="View">
                          <FiEye />
                        </Link>
                      </div>
                    </div>

                    <div className="bs-body">
                      <div className="bs-stars">
                        {[...Array(4)].map((_, s) => <FaStar key={s} />)}
                        <FaStarHalfAlt />
                        <span>({soldNums[i]})</span>
                      </div>
                      <div className="bs-name">{p.name}</div>
                      <div className="bs-sold"><FaFire /> {soldNums[i].toLocaleString()} sold this week</div>
                      <div className="bs-pricing">
                        <strong>${p.price}</strong>
                        <del>${fakeOld}</del>
                        <span className="bs-disc">-{disc}%</span>
                      </div>
                      <button
                        className={`bs-cart-btn${added ? " added" : ""}`}
                        onClick={() => onAddToCart(p._id)}
                      >
                        <FiShoppingCart />
                        {added ? "Added!" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
}
