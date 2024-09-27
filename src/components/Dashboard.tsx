"use client";
import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { featuredDeals, exclusiveDeals } from "../constants/deals";
import FeaturedCard from "./featured-card";
import FoodCard from "./food-card";
import FoodItems from "./get-foodItems";
import FoodItemModal from "./add-foodItem-modal";

const Dashboard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [foodItems, setFoodItems] = useState<any[]>([]);

  const handleAddItem = (item: any) => {
    setFoodItems((prevItems) => [...prevItems, item]);
  };

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/foodItems");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setFoodItems(data.foodItems);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 6,
          fontWeight: "bold",
          color: "#388e3c",
          fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
        }}
      >
        Featured Deals
      </Typography>

      <Grid container spacing={2}>
        {featuredDeals.map((deal, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FeaturedCard {...deal} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, mb: 4 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            bgcolor: "#388e3c",
            color: "white",
            py: 2,
            borderRadius: 1,
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
          }}
        >
          Online Exclusive Deals
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {exclusiveDeals.map((deal, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <FoodCard {...deal} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            mb: 4,
            fontWeight: "bold",
            bgcolor: "#388e3c", 
            color: "white", 
            py: 2, 
            borderRadius: 1, 
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
          }}
        >
          Latest Food Items
        </Typography>

        <FoodItems foodItems={foodItems} />
      </Box>

      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#388e3c",
            color: "white",
            "&:hover": {
              bgcolor: "#3cbb47",
            },
          }}
          onClick={() => setModalOpen(true)}
        >
          Add New Food Item
        </Button>
      </Box>

      <FoodItemModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </Container>
  );
};

export default Dashboard;
