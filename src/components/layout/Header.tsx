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
import { Logout } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import Chip from "@mui/material/Chip";

const Header: React.FC = () => {
  const pathname = usePathname();
  const isAuthRoute = pathname === "/login" || pathname === "/signup";
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, logout } = useAuth();
  const { clearCart } = useCart();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleLogout = () => {
    clearCart(); // Clear cart state and localStorage
    logout(); // Clear auth and redirect
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#1E3932",
        padding: "0px 10px",
        boxShadow: "0 6px 24px 0 #00000010",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
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
            {/* Show cart only for non-admin users */}
            {user?.role !== "admin" && !isAuthRoute && (
              <>
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
              </>
            )}
            {/* Only show Add Food Item button for admin */}
            {user?.role === "admin" && (
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
            )}
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
            {/* Place profile chip just before logout button, only if logged in and not on auth route */}
            {!isAuthRoute && user && (
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <Chip
                  icon={
                    user.role === "admin" ? (
                      <AdminPanelSettingsIcon sx={{ color: "#fff" }} />
                    ) : (
                      <AccountCircleIcon sx={{ color: "#fff" }} />
                    )
                  }
                  label={
                    user.role === "admin"
                      ? `Admin: ${user.username}`
                      : user.username
                  }
                  sx={{
                    bgcolor: user.role === "admin" ? "#edc802" : "#388e3c",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: isSmallScreen ? "0.9rem" : "1rem",
                    px: 2,
                    borderRadius: 2,
                    letterSpacing: 1,
                    height: 40,
                    minWidth: 120,
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              </Box>
            )}
            <Tooltip title="Logout">
              <Link href="/login" passHref>
                <Button
                  startIcon={<Logout sx={{ color: "#388e3c" }} />}
                  variant="outlined"
                  onClick={handleLogout}
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
      {/* Only show modal for admin */}
      {user?.role === "admin" && (
        <FoodItemModal open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </AppBar>
  );
};

export default Header;
