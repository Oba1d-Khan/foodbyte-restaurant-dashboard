import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { ICartItem } from "@/src/types/ICartItem";
import { roundToNearestTen } from "@/src/utils/priceUtils";

interface ICartItemCardProps {
  item: ICartItem;
  onRemove: () => void;
}

const CartItemCard: React.FC<ICartItemCardProps> = ({ item, onRemove }) => {
  const price = item.price ?? 0;
  const discountPercentage = item.discountPercentage ?? 0;
  const finalPrice = roundToNearestTen(
    discountPercentage > 0 ? price * (1 - discountPercentage / 100) : price
  );

  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "row",
        borderRadius: 2,
        overflow: "hidden",
        width: "100%",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: "50%", height: 140, objectFit: "cover" }}
        image={item.image}
        alt={item.title}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={1} pl={2} pr={2}>
          <Typography variant="h6" fontWeight="bold">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.description}
          </Typography>
          <Stack spacing={0.5}>
            {discountPercentage > 0 && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  color: "text.disabled",
                  fontSize: "0.85rem",
                }}
              >
                Rs. {price}
              </Typography>
            )}
            <Typography variant="h6" fontWeight="bold">
              Rs. {finalPrice}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <IconButton onClick={onRemove} color="secondary">
        <RemoveCircleOutlineIcon />
      </IconButton>
    </Card>
  );
};

export default CartItemCard;
