"use client";
import React, { useState } from "react";
import { Container, Box, Grid, Skeleton } from "@mui/material";
import SectionHeader from "../common/section-header";
import FoodCard from "./food-card";
import FeaturedCard from "./featured-card";
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
  const [loading, setLoading] = useState(true);

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
