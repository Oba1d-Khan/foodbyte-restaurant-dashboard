import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Grid,
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
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        padding: 2,
        boxShadow: 0.5,
        backgroundColor: "#ffffff",
        position: "relative",
        "&:hover": {
          boxShadow: 3,
          transform: "translateY(-4px)",
          transition: "transform 0.3s ease-in-out",
        },
      }}
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <Box
          fontSize={"0.8rem"}
          fontWeight={"bold"}
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            backgroundColor: "#B93241",
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
            image={item.image}
            alt={item.title}
          />
        </Grid>

        <Grid item xs={7} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ flex: 1, maxWidth: "90%" }}>
            <Typography
              variant="h6"
              component="div"
              fontSize={"1rem"}
              sx={{ fontWeight: "bold", mb: 1 }}
              lineHeight="1.2"
              letterSpacing={0}
            >
              {item.title}
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
              {item.description}
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
              <Tooltip title="Remove Item From Cart">
                <IconButton
                  onClick={onRemove}
                  color="error"
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                  }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItemCard;
