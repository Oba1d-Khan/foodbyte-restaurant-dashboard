'use client'
import React from 'react';
import { Button, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCart } from '@/context/CartContext';


interface AddToCartButtonProps {
    title: string;
    price: string;
    image: string;
    description: string;
    discount?: string;

}
const AddToCartButton: React.FC<AddToCartButtonProps> = ({ title, price, image, description, discount }) => {

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({ title, price, image, description, discount });
    };
    return (
        <Tooltip title="Add to Cart" arrow>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#388e3c',
                    color: 'white',
                    borderRadius: '50%',
                    minWidth: 48,
                    minHeight: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                        backgroundColor: '#388e4d',
                    },
                }}
                onClick={handleAddToCart}
            >
                <AddIcon fontSize="small" />
            </Button>
        </Tooltip>
    );
};

export default AddToCartButton;
