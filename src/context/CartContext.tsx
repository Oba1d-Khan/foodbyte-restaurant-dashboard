"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { IFoodItem } from "@/src/types/IFoodItem";
import { ICartItem } from "@/src/types/ICartItem"; // Import the ICartItem interface

interface CartContextType {
  cartItems: ICartItem[];
  addToCart: (item: IFoodItem) => void; // Adjusted to accept IFoodItem
  removeFromCart: (itemToRemove: ICartItem) => void; // Adjusted to accept ICartItem
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (item: IFoodItem) => {
    // Calculate final price based on the discount percentage
    const finalPrice = item.discountPercentage
      ? item.price * (1 - item.discountPercentage / 100) // Calculate final price
      : item.price; // No discount, use original price

    const cartItem: ICartItem = {
      ...item, // Spread the existing item properties
      finalPrice, // Add the final price
    };

    setCartItems((prevItems) => {
      const updatedCart = [...prevItems, cartItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (itemToRemove: ICartItem) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter(
        (item) => item._id !== itemToRemove._id // Use _id for comparison
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
