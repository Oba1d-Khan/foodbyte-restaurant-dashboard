'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CartItem {
    title: string;
    price: string;
    image: string;
    description: string;
    discount?: string;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    openCart: boolean;
    setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [openCart, setOpenCart] = useState(false);

    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => [...prevItems, item]);
        setOpenCart(true);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, openCart, setOpenCart }}>
            {children}
        </CartContext.Provider>
    );
};
