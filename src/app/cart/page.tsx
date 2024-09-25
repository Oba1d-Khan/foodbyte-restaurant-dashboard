'use client';
import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import FoodCard from '@/components/food-card';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const CartPage = () => {
    const { cartItems } = useCart();
    const router = useRouter();

    const handleContinueShopping = () => {
        router.push('/');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ mt: 8, mb: 4 }}>
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
            <Box sx={{ mt: 4 }}>
                {cartItems.length === 0 ? (
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
                            </Grid>
                        ))}
                    </Grid>
                )}
                <Button
                    sx={{ mt: 4, backgroundColor: 'black', color: 'white', '&:hover': { backgroundColor: '#555' } }}
                    variant="contained"
                    onClick={handleContinueShopping}
                    startIcon={<ArrowBackIosIcon />}
                >
                    Continue Shopping
                </Button>
            </Box>
        </Container>
    );
};

export default CartPage;
