import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import FoodCard from "./common-components/food-card";

const GetFoodItems: React.FC = () => {
  const [foodItems, setFoodItems] = useState<any[]>([]);

  const fetchFoodItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/foodItems");
      if (!response.ok) throw new Error("Failed to fetch food items");
      const data = await response.json();
      setFoodItems(data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      {foodItems.map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item._id}>
          <FoodCard foodItem={foodItems} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GetFoodItems;
