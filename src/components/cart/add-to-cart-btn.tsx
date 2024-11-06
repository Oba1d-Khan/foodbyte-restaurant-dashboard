"use client";
import React, { useState } from "react";
import { Button, Tooltip, Snackbar, Alert, Link, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCart } from "@/src/context/CartContext";
import { IFoodItem } from "@/src/types/IFoodItem";

interface AddToCartButtonProps {
  cartFoodItem: IFoodItem;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ cartFoodItem }) => {
  const {
    _id,
    title,
    description,
    image,
    price,
    discountPercentage = 0,
  } = cartFoodItem || {};
  const { addToCart } = useCart();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleAddToCart = () => {
    const finalPrice =
      discountPercentage > 0 ? price * (1 - discountPercentage / 100) : price;

    addToCart({
      _id,
      title,
      description,
      image,
      price,
      discountPercentage,
      finalPrice,
    });

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
          color="success"
          size="small"
          onClick={handleAddToCart}
          aria-label="Add to Cart"
          startIcon={<AddIcon sx={{ pl: 1 }} />}
          sx={{
            width: 50,
            height: 48,
            borderRadius: "50%",
            minWidth: 0,
          }}
        />
      </Tooltip>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
        >
          <Box textAlign="center">
            {snackbarMessage}
            <Link
              href="/cart"
              color="inherit"
              underline="none"
              display="block"
              fontWeight="bold"
              mt={1}
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
