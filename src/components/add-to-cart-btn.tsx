'use client';
import React, { useState } from 'react';
import { Button, Tooltip, Snackbar, Alert, Link, Box } from '@mui/material';
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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleAddToCart = () => {
        addToCart({ title, price, image, description, discount });
        setSnackbarMessage(`${title} added to cart!`);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
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

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000} 
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} 

            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
                >
                    <Box>
                        {snackbarMessage}
                        <Link
                            href="/cart"
                            color="inherit"
                            underline="none"
                            sx={{ display: 'block', mt: 1, fontWeight: 'bold' }}
                        >
                            View Cart
                        </Link>
                    </Box>
                </Alert>
            </Snackbar>
        </>
    );
};

export default AddToCartButton;
