import React from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddToCartButton from "./add-to-cart-btn";
import { IFoodItem } from "@/src/types/IFoodItem";

interface FoodCardProps {
  foodItem: IFoodItem;
  showAddToCartButton?: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({
  foodItem,
  showAddToCartButton = true,
}) => {
  const { title, description, price, discountPercentage = 0, image } = foodItem;

  const finalPrice = price * (1 - discountPercentage / 100);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        padding: 2,
        boxShadow: 1,
        backgroundColor: "#ffffff",
        position: "relative",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-4px)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      {discountPercentage > 0 && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "#ff5722",
            color: "white",
            padding: "0.5rem",
            borderRadius: "4px",
            fontSize: "0.8rem",
          }}
        >
          {discountPercentage}% OFF
        </Box>
      )}

      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <CardMedia
              component="img"
              sx={{
                borderRadius: 1,
                width: "140px",
                height: "140px",
                objectFit: "cover",
              }}
              image={image}
              alt={title}
            />
          </Grid>
          <Grid item xs={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ color: "#757575", fontSize: "0.9rem", mb: 2 }}
              >
                {description}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  {discountPercentage > 0 && (
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: "line-through",
                        color: "#9e9e9e",
                        fontSize: "0.85rem",
                      }}
                    >
                      Rs. {price.toFixed(2)}
                    </Typography>
                  )}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "black",
                    }}
                  >
                    Rs. {finalPrice.toFixed(2)}
                  </Typography>
                </Box>
                {showAddToCartButton && (
                  <AddToCartButton cartFoodItem={foodItem} />
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default FoodCard;
