import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

interface FoodItemModalProps {
  open: boolean;
  onClose: () => void;
  onAddItem: (item: any) => void;
}

const FoodItemModal: React.FC<FoodItemModalProps> = ({
  open,
  onClose,
  onAddItem,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    discount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/foodItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          discount: Number(formData.discount),
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const newItem = await response.json();
      onAddItem(newItem.foodItem);
      onClose();
      setFormData({
        title: "",
        description: "",
        image: "",
        price: "",
        discount: "",
      });
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          p: 4,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          width: { xs: "90%", sm: "400px" },
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Add New Food Item
        </Typography>
        <TextField
          label="Title"
          name="title"
          fullWidth
          value={formData.title}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          value={formData.description}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Image URL"
          name="image"
          fullWidth
          value={formData.image}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Price (Rs.)"
          name="price"
          type="number"
          fullWidth
          value={formData.price}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Discount (%)"
          name="discount"
          type="number"
          fullWidth
          value={formData.discount}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            bgcolor: "#388e3c",
            color: "white",
            "&:hover": {
              bgcolor: "#3cbb47",
            },
          }}
        >
          Add Item
        </Button>
      </Box>
    </Modal>
  );
};

export default FoodItemModal;
