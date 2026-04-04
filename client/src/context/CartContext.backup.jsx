import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Create the Context
const CartContext = createContext();

// 2. Create a Custom Hook for easy access
export const useCart = () => useContext(CartContext);

// 3. Create the Provider Component
export const CartProvider = ({ children }) => {
  // We initialize the cart from localStorage so items stay there if you refresh the page
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('nexamart_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('nexamart_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to Add Items
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((item) => item._id === product._id);
      if (exist) {
        // If it exists, just update the quantity
        return prevItems.map((item) =>
          item._id === product._id ? { ...exist, quantity: exist.quantity + (product.quantity || 1) } : item
        );
      }
      // If it's new, add it to the list
      return [...prevItems, product];
    });
  };

  // Function to Remove Items
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  // Function to Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};