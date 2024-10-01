import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import AddToCartButton from "./add-to-cart-btn";
import { IFoodItem } from "@/src/types/IFoodItem";
import { roundToNearestTen } from "@/src/utils/priceUtils";
interface IFeaturedItemProps {
  featuredFoodItem: IFoodItem;
  showAddToCartButton?: boolean;
}

const FeaturedCard: React.FC<IFeaturedItemProps> = ({
  featuredFoodItem,
  showAddToCartButton = true,
}) => {
  const {
    title,
    description,
    image,
    price,
    discountPercentage = 0,
    category,
  } = featuredFoodItem || {};

  const finalPrice = roundToNearestTen(price * (1 - discountPercentage / 100));

  return (
    <Card
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: 2,
        boxShadow: 3,
        position: "relative",
        "&:hover": {
          transform: "translateY(-8px)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={image}
        alt={title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
          {category}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          {description}
        </Typography>

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
              Rs. {finalPrice}{" "}
            </Typography>
          </Box>
          {showAddToCartButton && (
            <AddToCartButton cartFoodItem={featuredFoodItem} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default FeaturedCard;
