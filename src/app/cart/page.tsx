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
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { useCart } from "@/src/context/CartContext";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CartItemCard from "@/src/components/cart-item-card";
import { ICartItem } from "@/src/types/ICartItem";

const CartPage = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const handleGoBack = () => {
    router.push("/");
  };

  const handleClearCart = () => {
    clearCart();
    setSnackbarMessage("Cart cleared!");
    setSnackbarOpen(true);
  };

  const handleRemoveFromCart = (item: ICartItem) => {
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
      <Stack spacing={4} mt={2} mb={4}>
        <Box bgcolor="success.main" color="white" py={2} borderRadius={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={6}
          >
            <Tooltip title="Go Back">
              <IconButton color="inherit" onClick={handleGoBack}>
                <ArrowBackIosIcon />
              </IconButton>
            </Tooltip>

            <Typography
              variant="h4"
              align="center"
              fontSize={{ xs: "1.8rem", sm: "2.2rem", md: "2.5rem" }}
            >
              Your Shopping Cart
            </Typography>

            <Tooltip title="Clear Cart">
              <IconButton
                onClick={handleClearCart}
                sx={{
                  border: "1px solid",
                  borderColor: "error.main",
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: "error.light",
                  },
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>

        <Box>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : cartItems.length === 0 ? (
            <Typography variant="h6" align="center">
              Your cart is empty!
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {cartItems.map((item: ICartItem, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <CartItemCard
                    item={item}
                    onRemove={() => handleRemoveFromCart(item)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Divider />

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </Container>
  );
};

export default CartPage;
