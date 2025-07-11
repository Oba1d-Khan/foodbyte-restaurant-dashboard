"use client";
import React, { useEffect, useState } from "react";
import { Container, Box, Grid, Skeleton } from "@mui/material";
import SectionHeader from "../common/section-header";
import FoodCard from "./food-card";
import FeaturedCard from "./featured-card";
import { IFoodItem } from "@/src/types/IFoodItem";
import { useAuth } from "@/src/context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const sections = [
  "Featured",
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

const Dashboard: React.FC = () => {
  const [foodItems, setFoodItems] = useState<IFoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<IFoodItem | null>(null);
  const [editForm, setEditForm] = useState<Partial<IFoodItem>>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch("/api/foodItems");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setFoodItems(data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodItems();
  }, []);

  const getCategoryItems = (category: string) => {
    return foodItems.filter(
      (item) =>
        item.category === category ||
        (category === "Featured" && item.isFeatured)
    );
  };

  // Admin: Edit Food Item
  const handleEditClick = (item: IFoodItem) => {
    setEditItem(item);
    setEditForm({ ...item });
    setEditModalOpen(true);
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSave = async () => {
    const res = await fetch("/api/foodItems", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...editForm, _id: editItem?._id }),
    });
    if (res.ok) {
      setEditModalOpen(false);
      setEditItem(null);
      setEditForm({});
      // Refresh food items
      const response = await fetch("/api/foodItems");
      setFoodItems(await response.json());
    }
  };

  // Admin: Delete Food Item
  const handleDeleteClick = (id: string) => {
    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = async () => {
    if (deleteItemId) {
      const res = await fetch("/api/foodItems", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: deleteItemId }),
      });
      if (res.ok) {
        setDeleteDialogOpen(false);
        setDeleteItemId(null);
        // Refresh food items
        const response = await fetch("/api/foodItems");
        setFoodItems(await response.json());
      }
    }
  };
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setDeleteItemId(null);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Food Item</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={editForm.title || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            value={editForm.description || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Price"
            name="price"
            type="number"
            value={editForm.price || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Discount (%)"
            name="discountPercentage"
            type="number"
            value={editForm.discountPercentage || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Category"
            name="category"
            value={editForm.category || ""}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Food Item</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this food item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {sections.map((section) => (
        <Box key={section} mt={10} id={section}>
          <SectionHeader title={section} />
          <Grid container spacing={2}>
            {loading
              ? Array.from(new Array(6)).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} rowGap={4} key={index}>
                    <Skeleton
                      variant="rectangular"
                      width={360}
                      height={250}
                      animation="wave"
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        mt: 1,
                        mb: 3,
                      }}
                    >
                      <Skeleton variant="rectangular" width={200} height={40} />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 1,
                        }}
                      >
                        <Skeleton
                          variant="rectangular"
                          width={150}
                          height={30}
                        />
                        <Skeleton
                          variant="circular"
                          width={40}
                          height={40}
                          sx={{ mr: 2 }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                ))
              : getCategoryItems(section).map((foodItem) => (
                  <Grid item xs={12} sm={6} md={4} key={foodItem._id}>
                    {section === "Featured" ? (
                      <FeaturedCard
                        featuredFoodItem={foodItem}
                        showAddToCartButton={user?.role !== "admin"}
                      />
                    ) : (
                      <Box position="relative">
                        <FoodCard
                          foodItem={foodItem}
                          showAddToCartButton={user?.role !== "admin"}
                        />
                        {user?.role === "admin" && (
                          <Box
                            position="absolute"
                            top={8}
                            right={8}
                            zIndex={2}
                            display="flex"
                            gap={1}
                            sx={{
                              bgcolor: "#f3f3f7",
                              borderRadius: 2,
                              boxShadow: 1,
                              p: 0.5,
                              alignItems: "center",
                              transition: "box-shadow 0.2s, background 0.2s",
                              "&:hover": {
                                bgcolor: "#ede7f6",
                                boxShadow: 3,
                              },
                            }}
                          >
                            <IconButton
                              color="primary"
                              size="small"
                              onClick={() => handleEditClick(foodItem)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              color="error"
                              size="small"
                              onClick={() => handleDeleteClick(foodItem._id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Grid>
                ))}
          </Grid>
        </Box>
      ))}
    </Container>
  );
};

export default Dashboard;
