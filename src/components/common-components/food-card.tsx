import React from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import AddToCartButton from "./add-to-cart-btn";
import { IFoodItem } from "@/src/types/IFoodItem";
import { roundToNearestTen } from "@/src/utils/priceUtils";

interface FoodCardProps {
  foodItem: IFoodItem;
  showAddToCartButton?: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({
  foodItem,
  showAddToCartButton = true,
}) => {
  const { title, description, price, discountPercentage = 0, image } = foodItem;

  const finalPrice = roundToNearestTen(price * (1 - discountPercentage / 100));

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
        height: "140px",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-4px)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      {discountPercentage > 0 && (
        <Box
          fontSize={"0.8rem"}
          fontWeight={"bold"}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "#ff5722",
            color: "white",
            padding: "0.5rem",
            borderRadius: "4px",
          }}
        >
          {discountPercentage}% OFF
        </Box>
      )}

      <Grid container spacing={2}>
        <Grid
          item
          xs={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              borderRadius: 1.2,
              height: "140px",
              maxWidth: "180px",
              objectFit: "cover",
            }}
            image={image}
            alt={title}
          />
        </Grid>
        <Grid item xs={7} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="div"
              fontSize={"1rem"}
              sx={{ fontWeight: "bold", mb: 1 }}
              lineHeight="1.2"
              letterSpacing={0}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              fontSize={"0.85rem"}
              sx={{
                color: "#757575",
                mb: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
          </Box>
          <Box sx={{ mt: "auto", pt: 1 }}>
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
                    Rs. {price}
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
                  Rs. {finalPrice}
                </Typography>
              </Box>
              {showAddToCartButton && (
                <AddToCartButton cartFoodItem={foodItem} />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default FoodCard;
