import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Stack,
  Snackbar,
  Alert,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import ImageUpload from "@/src/components/common/image-upload";
import Image from "next/image";

const categories = [
  "Burgers",
  "Sandwiches",
  "Wraps",
  "Fries",
  "Beverages",
  "Donuts",
  "Coffee",
  "Milkshakes",
  "Lemonades",
  "Teas",
  "Extra",
];

interface FoodItemModalProps {
  open: boolean;
  onClose: () => void;
}

const FoodItemModal: React.FC<FoodItemModalProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    discountPercentage: "",
    category: "",
    featured: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  if (!open) return null;

  const handleTextFieldChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (url: string) => {
    setFormData({ ...formData, image: url });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData({ ...formData, featured: checked });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/foodItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          discountPercentage: Number(formData.discountPercentage),
          isFeatured: formData.featured,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSnackbarMessage("Item added successfully!");
        onClose();
        setFormData({
          title: "",
          description: "",
          image: "",
          price: "",
          discountPercentage: "",
          category: "",
          featured: false,
        });
      } else {
        setSnackbarMessage(
          "Error adding item: " + (responseData.message || response.statusText)
        );
      }

      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error adding food item:", error);
      setSnackbarMessage("Error adding item!");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 100,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
        onClick={onClose}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "14px 24px",
            maxWidth: "700px",
            width: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Stack spacing={2}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="h6">Add New Food Item</Typography>
              <IconButton onClick={onClose} aria-label="close">
                <ClearIcon />
              </IconButton>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Stack spacing={2} flex={1}>
                <TextField
                  label="Title"
                  name="title"
                  fullWidth
                  value={formData.title}
                  onChange={handleTextFieldChange}
                  required
                />
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  value={formData.description}
                  onChange={handleTextFieldChange}
                  required
                />
                <TextField
                  label="Price (Rs.)"
                  name="price"
                  type="number"
                  fullWidth
                  value={formData.price}
                  onChange={handleTextFieldChange}
                  required
                />
                <TextField
                  label="Discount (%)"
                  name="discountPercentage"
                  type="number"
                  fullWidth
                  inputProps={{ min: 0 }}
                  value={formData.discountPercentage}
                  onChange={handleTextFieldChange}
                />

                {/* Replaced MUI Select with styled native select */}
                <FormControl fullWidth>
                  <Typography
                    variant="body2"
                    component="label"
                    htmlFor="category"
                    sx={{ mb: 1, ml: 1 }}
                  >
                    Category *
                  </Typography>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleTextFieldChange}
                    required
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "4px",
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      backgroundColor: "transparent",
                      fontSize: "16px",
                    }}
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FormControl>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.featured}
                      onChange={handleCheckboxChange}
                      name="featured"
                    />
                  }
                  label="Featured"
                />
              </Stack>

              <Stack spacing={2} flex={1} alignItems="center">
                <ImageUpload setImageUrl={handleImageUpload} />
                {formData.image && (
                  <Box display="flex" alignItems="start" gap={1}>
                    <Image
                      src={formData.image}
                      alt="Uploaded preview"
                      width={260}
                      height={160}
                      style={{ objectFit: "cover", borderRadius: 8 }}
                    />
                    <IconButton
                      color="primary"
                      onClick={() => setFormData({ ...formData, image: "" })}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Box>
                )}
              </Stack>
            </Stack>

            <Button
              variant="contained"
              onClick={handleSubmit}
              startIcon={<AddIcon />}
              sx={{
                alignSelf: "center",
                width: "fit-content",
                mt: 2,
                bgcolor: "#1E3932",
                "&:hover": {
                  bgcolor: "#145c51",
                },
              }}
            >
              Add Item
            </Button>
          </Stack>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarMessage.includes("Error") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FoodItemModal;
