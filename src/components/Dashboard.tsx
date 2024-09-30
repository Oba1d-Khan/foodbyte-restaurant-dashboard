"use client";
import React, { useState, useEffect } from "react";
import { Container, Box, Grid } from "@mui/material";
import SectionHeader from "./common-components/section-header";
import FoodCard from "./common-components/food-card";
import FeaturedCard from "./common-components/featured-card";
import { IFoodItem } from "@/src/types/IFoodItem";

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

  const getCategoryItems = (category: string) => {
    return foodItems.filter(
      (item) =>
        item.category === category ||
        (category === "Featured" && item.isFeatured)
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      {sections.map((section) => (
        <Box key={section} mt={10} id={section}>
          <SectionHeader title={section} />
          <Grid container spacing={2}>
            {getCategoryItems(section).map((foodItem) => (
              <Grid item xs={12} sm={6} md={4} key={foodItem._id}>
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
