"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  Button,
  Badge,
  Box,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import Link from "next/link";
import { useCart } from "@/src/context/CartContext";
import FoodItemModal from "@/src/components/dashboard/add-foodItem-modal";
import CartSidebar from "@/src/components/cart/cart-sidebar";
import { useTheme } from "@mui/material/styles";
import { logout } from "@/src/app/(auth)/login/actions";
import { Logout } from "@mui/icons-material";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isAuthRoute = pathname === "/login" || pathname === "/signup";
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <AppBar sx={{ backgroundColor: "#1E3932", padding: "0px 10px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant={isSmallScreen ? "h5" : "h4"}
          sx={{ color: "#b4fab7", fontWeight: "bold" }}
        >
          FoodByte.
        </Typography>

        {isAuthRoute ? (
          <Tooltip title="Chat with us on WhatsApp">
            <Link href="https://wa.me/+923151272630" passHref target="_blank">
              <Button
                aria-label="chat with us on WhatsApp"
                variant="outlined"
                startIcon={<WhatsAppIcon sx={{ color: "#388e3c" }} />}
                sx={{
                  bgcolor: "white",
                  color: "#388e3c",
                  borderRadius: "10px",
                  borderColor: "#388e3c",
                  fontWeight: "medium",
                  "&:hover": {
                    bgcolor: "#b4fab7",
                    scale: "1.1",
                  },
                }}
              >
                {!isSmallScreen && "Chat Now"}
              </Button>
            </Link>
          </Tooltip>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: isSmallScreen ? 1 : 2,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Tooltip title="Open Cart">
              <IconButton onClick={handleCartToggle}>
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartIcon
                    sx={{
                      color: "white",
                      padding: 1,
                      borderRadius: "10px",
                      "&:hover": {
                        bgcolor: "#388e3c",
                        scale: "1.1",
                      },
                    }}
                  />
                </Badge>
              </IconButton>
            </Tooltip>
            <CartSidebar open={isCartOpen} onClose={handleCartToggle} />
            <Tooltip title="Add New Food Item">
              <Button
                aria-label="add new food item"
                variant="outlined"
                onClick={() => setModalOpen(true)}
                sx={{
                  bgcolor: "white",
                  color: "#388e3c",
                  borderRadius: "10px",
                  borderColor: "#388e3c",
                  "&:hover": {
                    bgcolor: "#b4fab7",
                    scale: "1.1",
                  },
                }}
              >
                <AddBusinessIcon sx={{ color: "#388e3c" }} />
              </Button>
            </Tooltip>
            <Tooltip title="Chat with us on WhatsApp">
              <Link href="https://wa.me/+923151272630" passHref target="_blank">
                <Button
                  aria-label="chat with us on WhatsApp"
                  variant="outlined"
                  startIcon={<WhatsAppIcon sx={{ color: "#388e3c" }} />}
                  sx={{
                    bgcolor: "white",
                    color: "#388e3c",
                    borderRadius: "10px",
                    borderColor: "#388e3c",
                    fontWeight: "medium",
                    "&:hover": {
                      bgcolor: "#b4fab7",
                      scale: "1.1",
                    },
                  }}
                >
                  {!isSmallScreen && "Chat Now"}
                </Button>
              </Link>
            </Tooltip>
            <Tooltip title="Logout">
              <Link href="/login" passHref>
                <Button
                  startIcon={<Logout sx={{ color: "#388e3c" }} />}
                  variant="outlined"
                  onClick={logout}
                  sx={{
                    bgcolor: "white",
                    color: "#388e3c",
                    borderRadius: "10px",
                    borderColor: "#388e3c",
                    fontWeight: "medium",
                    "&:hover": {
                      bgcolor: "#b4fab7",
                      scale: "1.1",
                    },
                  }}
                ></Button>
              </Link>
            </Tooltip>
          </Box>
        )}
      </Toolbar>

      <FoodItemModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </AppBar>
  );
};

export default Header;
