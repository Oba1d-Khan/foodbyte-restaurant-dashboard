"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  CircularProgress,
  Divider,
  Snackbar,
  Alert,
  Stack,
  Tooltip,
  Button,
} from "@mui/material";
import { useCart } from "@/src/context/CartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import CartItemCard from "@/src/components/cart/cart-item-card";
import CloseIcon from "@mui/icons-material/Close";
import { roundToNearestTen } from "@/src/utils/priceUtils";
import { ICartItem } from "@/src/types/ICartItem";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ open, onClose }) => {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    setLoading(false);
  }, [cartItems]);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (item.finalPrice || item.price) * (item.quantity || 1),
    0
  );

  const totalDiscount = cartItems.reduce(
    (total, item) =>
      total +
      (item.discountPercentage
        ? item.price * (item.discountPercentage / 100) * (item.quantity || 1)
        : 0),
    0
  );

  const total = subtotal;

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

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  if (!open) return null;

  return (
    <>
      <Box
        onClick={onClose}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1200,
          transition: "opacity 0.3s ease-in-out",
          opacity: open ? 1 : 0,
        }}
      />

      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          width: { xs: "90vw", sm: "500px" },
          height: "100vh",
          bgcolor: "background.paper",
          boxShadow: "-4px 0 8px rgba(0, 0, 0, 0.1)",
          zIndex: 1300,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack spacing={2} sx={{ p: 2, height: "100%", overflow: "hidden" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
            bgcolor="#1E3932"
            color="#D9E89A"
            borderRadius="10px"
          >
            <Typography variant="h5" fontWeight="bold">
              Your Cart ({totalItems} item{totalItems > 1 ? "s" : ""})
            </Typography>
            <Stack direction="row" gap={1}>
              <Tooltip title="Clear Cart">
                <IconButton
                  onClick={handleClearCart}
                  sx={{
                    color: "white",
                    "&:hover": {
                      bgcolor: "error.light",
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <IconButton onClick={onClose} sx={{ color: "#D9E89A" }}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </Stack>

          {loading ? (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress />
            </Box>
          ) : cartItems.length === 0 ? (
            <Typography variant="h6" align="center">
              Your cart is empty!
            </Typography>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, overflow: "auto", pt: 2 }}>
                <Grid container spacing={2}>
                  {cartItems.map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <CartItemCard
                        item={item}
                        onRemove={() => handleRemoveFromCart(item)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Box
                sx={{
                  mt: "auto",
                  bgcolor: "#f5f5f5",
                  borderRadius: "10px",
                  p: 2,
                }}
              >
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="black">Subtotal</Typography>
                    <Typography fontWeight="bold" color="black">
                      Rs. {roundToNearestTen(subtotal)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography color="black">Discount</Typography>
                    <Typography fontWeight="bold" color="black">
                      - Rs. {roundToNearestTen(totalDiscount)}
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography fontWeight="medium" color="black">
                      Total
                    </Typography>
                    <Typography fontWeight="bold" color="black">
                      Rs. {total.toFixed(2)}
                    </Typography>
                  </Stack>
                </Stack>

                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    variant="contained"
                    sx={{
                      width: "50%",
                      bgcolor: "#1E3932",
                      "&:hover": {
                        bgcolor: "#2E4942",
                      },
                    }}
                  >
                    Checkout
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Stack>
      </Box>

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
    </>
  );
};

export default CartSidebar;
