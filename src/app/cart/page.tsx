'use client'
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
    Snackbar,
    Alert,
} from "@mui/material";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CartItemCard from "@/components/cart-item-card";

type TItemProps = {
    title: string;
    price: string;
    image: string;
    description: string;
    discount?: string;
}

const CartPage = () => {
    const { cartItems, clearCart, removeFromCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const router = useRouter();

    const handleGoBack = () => {
        router.push("/");
    };

    const handleClearCart = () => {
        clearCart();
        setSnackbarMessage("Cart cleared!");
        setSnackbarOpen(true);
    };

    const handleRemoveFromCart = (item: TItemProps) => {
        removeFromCart(item);
        setSnackbarMessage(`${item.title} removed from cart!`);
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
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
                            onClick={handleClearCart}
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
                                <CartItemCard
                                    title={item.title}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                    onRemove={() => handleRemoveFromCart(item)}
                                />
                            </Grid>
                        ))}
                    </Grid>

                )}

                <Divider sx={{ mt: 6 }} />

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleSnackbarClose} severity="success">
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Container>
    );
};

export default CartPage;
