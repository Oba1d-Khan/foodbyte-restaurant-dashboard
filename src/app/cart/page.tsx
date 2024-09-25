'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Container, Grid, CircularProgress, Divider } from '@mui/material';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import FoodCard from '@/components/food-card';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
    const { cartItems, clearCart, removeFromCart } = useCart();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const handleContinueShopping = () => {
        router.push('/');
    };

    useEffect(() => {
        if (cartItems.length > 0) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [cartItems]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 2, mb: 4 }}>
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        bgcolor: '#388e3c',
                        color: 'white',
                        py: 2,
                        borderRadius: 1,
                        fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                    }}
                >
                    Your Shopping Cart
                </Typography>
            </Box>
            <Box sx={{ mt: 10 }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : cartItems.length === 0 ? (
                    <Typography variant="h6" align="center">
                        Your cart is empty!
                    </Typography>
                ) : (
                    <Grid container spacing={3}>
                        {cartItems.map((item, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <FoodCard
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                    discount={item.discount}
                                    showAddToCartButton={false}
                                />
                                <Box display="flex" justifyContent="space-between" mt={2}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => removeFromCart(item)}
                                        startIcon={<RemoveIcon />}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )}

                <Divider sx={{ mt: 6 }} />

                <Box display="flex" justifyContent="space-between" mt={4}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={clearCart}
                        startIcon={<DeleteIcon />}
                    >
                        Clear Cart
                    </Button>
                    <Button
                        sx={{ backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#555' } }}
                        variant="contained"
                        onClick={handleContinueShopping}
                        startIcon={<ArrowBackIosIcon />}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default CartPage;
