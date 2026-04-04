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
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((item) => item._id === product._id);
      if (exist) {
        // If it exists, just update the quantity
        return prevItems.map((item) =>
          item._id === product._id 
            ? { 
                ...exist, 
                quantity: exist.quantity + quantity,
                priceAtPurchase: product.price
              } 
            : item
        );
      }
      // If it's new, add it to the list
      return [
        ...prevItems, 
        {
          ...product,
          quantity: quantity,
          priceAtPurchase: product.price
        }
      ];
    });
  };

  // Function to Update Quantity
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  // Function to Remove Items
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  // Function to Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Function to get total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.priceAtPurchase || item.price || 0);
      return total + (price * item.quantity);
    }, 0);
  };

  // Function to get total items count
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
