import React, { useEffect, useState } from "react";

const banners = [
  {
    title: "සුභ අලුත් අවුරුද්දක් 🌸",
    text: "Aurudu Special Offer - Up to 50% Off",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=1000",
  },
  {
    title: "Aurudu Deals 🎁",
    text: "Buy 2 Get 1 Free on Selected Items",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1000",
  },
  {
    title: "Festival Savings 🎉",
    text: "Free Delivery for Aurudu Orders",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1000",
  },
];

const PopupBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed shadow-lg rounded overflow-hidden mx-auto left-0 right-0 md:left-5 md:top-[172px] top-32 w-[90%] max-w-sm z-50"
      style={{
        background: "linear-gradient(to bottom, #FFF7ED, #FEF3C7)",
        border: "2px solid #F59E0B",
      }}
    >
      <img
        src={banners[current].image}
        alt={banners[current].title}
        className="w-full h-44 md:h-48 object-cover"
      />

      <div className="p-3 text-center">
        <h5 className="fw-bold text-red-700 text-sm md:text-base lg:text-lg">
          {banners[current].title}
        </h5>
        <p className="mb-0 text-orange-800 text-xs md:text-sm">
          {banners[current].text}
        </p>
      </div>
    </div>
  );
};

export default PopupBanner;