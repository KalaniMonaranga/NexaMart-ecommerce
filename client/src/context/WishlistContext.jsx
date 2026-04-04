import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the Context
const WishlistContext = createContext();

// 2. Create a Custom Hook for easy access
export const useWishlist = () => useContext(WishlistContext);

// 3. Create the Provider Component
export const WishlistProvider = ({ children }) => {
  // We initialize the wishlist from localStorage so items stay there if you refresh the page
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('nexamart_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save to localStorage whenever wishlistItems changes
  useEffect(() => {
    localStorage.setItem('nexamart_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Function to Add Items to Wishlist
  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      const exist = prevItems.find((item) => item._id === product._id);
      if (exist) {
        // If it exists, remove it (toggle functionality)
        return prevItems.filter((item) => item._id !== product._id);
      }
      // If it's new, add it to the list
      return [...prevItems, product];
    });
  };

  // Function to Remove Items from Wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item._id !== id));
  };

  // Function to Clear Wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Function to check if item is in wishlist
  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item._id === id);
  };

  // Function to get wishlist count
  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  // Function to move item from wishlist to cart
  const moveToCart = (product, addToCartFunction) => {
    addToCartFunction(product, 1);
    removeFromWishlist(product._id);
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlistItems, 
        addToWishlist, 
        removeFromWishlist, 
        clearWishlist,
        isInWishlist,
        getWishlistCount,
        moveToCart
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
