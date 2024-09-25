"use client";
import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    CircularProgress,
    Divider,
    IconButton,
    Tooltip,
} from "@mui/material";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import FoodCard from "@/components/food-card";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CartPage = () => {
    const { cartItems, clearCart, removeFromCart } = useCart();
    const [loading, setLoading] = useState(true);
    const router = useRouter();


    const handleGoBack = () => {
        router.push("/");
    };

    useEffect(() => {
        setLoading(false);
    }, [cartItems]);

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 2, mb: 4 }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    backgroundColor="#388e3c"
                    color={"white"}
                    py={2}
                    px={6}
                    borderRadius={2}
                >
                    <Tooltip title="Go Back">
                        <IconButton
                            sx={{
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "#4caf50",
                                    scale: "1.1",
                                },
                            }}
                            onClick={handleGoBack}
                        >
                            <ArrowBackIosIcon />
                        </IconButton>
                    </Tooltip>

                    <Typography
                        variant="h4"
                        align="center"
                        sx={{
                            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                        }}
                    >
                        Your Shopping Cart
                    </Typography>

                    <Tooltip title="Clear Cart">
                        <IconButton
                            sx={{
                                backgroundColor: "white",
                                color: "#d32f2f",
                                "&:hover": {
                                    backgroundColor: "#ffebee",
                                    scale: "1.1",
                                },
                                border: "1px solid #d32f2f",
                                borderRadius: "500px",
                            }}
                            onClick={clearCart}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
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
                                <Box sx={{ position: "relative" }}>
                                    <FoodCard
                                        title={item.title}
                                        description={item.description}
                                        price={item.price}
                                        // oldPrice={item.oldPrice} {/* Old price restored */}
                                        image={item.image}
                                        discount={item.discount}
                                        showAddToCartButton={false}
                                    />
                                    <Tooltip title="Remove from Cart">
                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                top: 10,
                                                right: 10,
                                                backgroundColor: "white",
                                                color: "#d32f2f",
                                                "&:hover": {
                                                    backgroundColor: "#ffebee",
                                                    scale: "1.1",
                                                },
                                            }}
                                            onClick={() => removeFromCart(item)}
                                        >
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                )}

                <Divider sx={{ mt: 6 }} />
            </Box>
        </Container>
    );
};

export default CartPage;
