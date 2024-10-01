import React, { useState } from "react";
import {
  Modal,
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
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import ImageUpload from "@/src/components/image-upload";
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

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, category: e.target.value });
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
      <Modal open={open} onClose={onClose}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Box
            p={4}
            bgcolor="background.paper"
            borderRadius={2}
            boxShadow={3}
            sx={{
              width: { xs: "95%", sm: "700px" },
              maxHeight: "90vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
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

              <Stack direction="row" spacing={2}>
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
                  <FormControl fullWidth required>
                    <InputLabel id="category-label">Category</InputLabel>
                    <Select
                      labelId="category-label"
                      name="category"
                      value={formData.category}
                      onChange={handleSelectChange}
                      label="Category"
                      required
                    >
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
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
                        sx={{ objectFit: "cover" }}
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
                sx={{ alignSelf: "center", width: "fit-content", mt: 2 }}
              >
                Add Item
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>

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
