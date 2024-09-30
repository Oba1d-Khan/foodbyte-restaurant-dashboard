import React from "react";
import { Card, CardMedia, Typography, Box, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { ICartItem } from "@/src/types/ICartItem";

interface ICartItemCardProps {
  item: ICartItem;
  onRemove: () => void;
}

const CartItemCard: React.FC<ICartItemCardProps> = ({ item, onRemove }) => {
  const price = item.price ?? 0;
  const discountPercentage = item.discountPercentage ?? 0;
  const finalPrice =
    discountPercentage > 0 ? price * (1 - discountPercentage / 100) : price;

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
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
      <CardMedia
        component="img"
        sx={{
          borderRadius: 1,
          width: "140px",
          height: "140px",
          objectFit: "cover",
        }}
        image={item.image}
        alt={item.title}
      />
      <Box sx={{ flexGrow: 1, paddingLeft: 2 }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", mb: 1 }}
        >
          {item.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ color: "#757575", mb: 1 }}
        >
          {item.description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
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
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            Rs. {finalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={onRemove} sx={{ color: "#d32f2f", marginLeft: 2 }}>
        <RemoveCircleOutlineIcon />
      </IconButton>
    </Card>
  );
};

export default CartItemCard;
