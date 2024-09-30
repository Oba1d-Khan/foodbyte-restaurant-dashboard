"use client";
import React, { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import SectionHeader from "./common-components/section-header";
import FoodCard from "./common-components/food-card";
import FeaturedCard from "./common-components/featured-card";
import { IFoodItem } from "@/src/types/IFoodItem";

// List of all categories
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

  // Fetching food items from the API
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch("/api/foodItems");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setFoodItems(data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  // Helper function to filter items by category
  const getCategoryItems = (category: string) => {
    return foodItems.filter(
      (item) =>
        item.category === category ||
        (category === "Featured" && item.isFeatured)
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      {" "}
      {/* Added margin-top to avoid overlap with fixed navbar */}
      {/* Loop through each section dynamically */}
      {sections.map((section) => (
        <Box key={section} sx={{ mt: 8 }} id={section}>
          {" "}
          {/* Each section has its id */}
          <SectionHeader title={section} />
          <Grid container spacing={2}>
            {getCategoryItems(section).map((foodItem) => (
              <Grid item xs={12} sm={6} md={4} key={foodItem._id}>
                {/* Render FeaturedCard for 'Featured' section, else render FoodCard */}
                {section === "Featured" ? (
                  <FeaturedCard
                    featuredFoodItem={foodItem}
                    showAddToCartButton
                  />
                ) : (
                  <FoodCard foodItem={foodItem} showAddToCartButton />
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
